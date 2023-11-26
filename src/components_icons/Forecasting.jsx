import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { supabase } from '../supabaseClient'; 

export default function Forecasting() {
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("measurements").select("*");

      const values = data.map((reg, index) => ({ x: index, y: reg.temperature }));
      const tensorData = convertToTensor(values);
      const model = await trainModel(tensorData);
      console.log("Done Training");

      testModel(model, values, tensorData);
    }

    async function trainModel(tensorData) {
      const model = createModel();
      tfvis.show.modelSummary({ name: "Model Summary" }, model);

      const { inputs, labels } = tensorData;
      model.compile({
        optimizer: "adam",
        loss: "meanSquaredError",
        metrics: ["mse"],
      });

      const batchSize = 32;
      const epochs = 50;

      await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: "Training Performance" },
          ["loss", "mse"],
          { height: 200, callbacks: ["onEpochEnd"] }
        ),
      });

      return model;
    }

    function convertToTensor(values) {
      return tf.tidy(() => {
        tf.util.shuffle(values);
        const inputs = values.map((d) => d.x);
        const labels = values.map((d) => d.y);

        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return {
          inputs: normalizedInputs,
          labels: normalizedLabels,
          inputMax,
          inputMin,
          labelMax,
          labelMin,
        };
      });
    }

    function createModel() {
      const model = tf.sequential();
      model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
      model.add(tf.layers.dense({ units: 1, useBias: true }));
      return model;
    }

    function testModel(model, inputData, normalizationData) {
      const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

      const [xs, preds] = tf.tidy(() => {
        const xs = tf.linspace(0, 1, 100);
        const preds = model.predict(xs.reshape([100, 1]));

        const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);
        const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

        return [unNormXs.dataSync(), unNormPreds.dataSync()];
      });

      const predictedPoints = Array.from(xs).map((val, i) => ({ x: val, y: preds[i] }));
      const originalPoints = inputData.map((d) => ({ x: d.x, y: d.y }));

      tfvis.render.scatterplot(
        { name: 'Model Predictions vs Original Data' },
        { values: [originalPoints, predictedPoints], series: ['original', 'predicted'] },
        { xLabel: 'Días', yLabel: 'Temperatura', height: 350 }
      );
    }

    fetchData();
  }, []);

  return (
    <>
      <p>Forecasting</p>
    </>
  );
}
