---
seo_title: "Tomato Pest CNN Classifier (95% accuracy) | Abduallh Rawak"
title: Classifying tomato crop pests from photos with a CNN
short_title: Tomato pest classifier
description: "A TensorFlow/Keras CNN that identifies tomato pests from a photo with 95.1% test accuracy, deployed as a Streamlit app that also suggests control methods."
summary: Deep-learning image classifier for tomato crop pests, deployed as a Streamlit web app with control advice for each pest.
headline_result: 95.1% test accuracy on 4,263 images
date: 2023-09-27
last_modified_at: 2023-09-28
order: 3
featured: true
tags: [deep-learning, machine-learning, python, streamlit]
stack: [Python, TensorFlow, Keras, NumPy, Matplotlib, Streamlit, Google Colab]
languages: [Python]
repo: https://github.com/abduallheid/Deeplearning_Agricultural_pests
demo: https://deeplearningagriculturalpests-abdo-rawak.streamlit.app/
role: Team project (5 students) – [VERIFY] my part, e.g. model design, training and Streamlit deployment.
problem: Farmers lose tomato yield because pests are identified late or wrongly, and expert identification isn't available in the field.
image:
  base: /assets/img/projects/tomato-pest-classifier/cover
  width: 1041
  height: 996
  alt: Grid of nine pest photos from the test set, each labelled with its actual class, the predicted class and the model's confidence, mostly between 95% and 100%.
  caption: Predictions on unseen test images – actual class, predicted class and confidence.
results:
  - { value: "95.1%", label: "accuracy on the held-out test set" }
  - { value: "4,263", label: "labelled pest images" }
  - { value: "8", label: "pest species classified" }
  - { value: "184K", label: "model parameters – small enough for a free app tier" }
---

## Problem

Correctly naming a pest is the first step to treating it, and getting it wrong means the wrong pesticide, wasted money and continued crop loss. Expert identification is rarely available in the field, but almost every farmer has a phone camera. The goal: **upload a photo, get the pest's name and how to control it.**

## Approach

**Data.** 4,263 labelled photos across 8 pest classes, sourced from the [IPM Images](https://www.ipmimages.org/) archive. [VERIFY: image licence] The classes are labelled by species code: BA, HA, MP, SE, SL, TP, TU and ZC – for example *Bemisia argentifolii* (silverleaf whitefly), *Helicoverpa armigera* (cotton bollworm), *Myzus persicae* (green peach aphid) and *Spodoptera* armyworms. [VERIFY: species names for each code]

**Preprocessing.** Images loaded with `image_dataset_from_directory`, resized to 256 × 256 and rescaled to 0–1 inside the model, so the deployed app needs no separate preprocessing code. The dataset was split **80 / 10 / 10** into train, validation and test, then cached and prefetched with `tf.data` for faster training on Colab GPUs.

**Augmentation.** Random horizontal and vertical flips and rotations (±20%) on the training set only – pests appear at every angle on a leaf.

**Model.** A compact convolutional network: stacked `Conv2D` + `MaxPooling` blocks, a 64-unit dense layer and an 8-way softmax output – **184,072 parameters** in total. Trained for 50 epochs with Adam and sparse categorical cross-entropy.

## Architecture

```
Photo upload (Streamlit) ─► resize 256×256 + rescale ─► CNN (Keras SavedModel / .h5)
                                                           │
                                         softmax over 8 classes → top class + confidence
                                                           │
                                     pest name + recommended control methods shown in the app
```

## Results

- **95.1% accuracy on the test split** the model never saw during training, with **95.4% validation accuracy** at the final epoch.
- The sample grid above shows predictions on test images – most are correct with confidence above 95%.
- The trained model is **small (184K parameters)**, so it runs comfortably on Streamlit Community Cloud's free tier.

[FILL IN: per-class precision/recall or a confusion matrix from the notebook – it would show which pests get confused with each other.]

## Challenges

- **Validation accuracy fluctuated** between epochs (for example 88% at epoch 48, 95% at epoch 50) because the validation set is small (about 6 batches). Early stopping on validation loss, or a larger validation split, would give a more stable model choice.

## Lessons

- **Put preprocessing inside the model.** Making resizing and rescaling layers of the network removed a whole class of train/serve mismatch bugs in the app.
- **Report the test score, not the best validation epoch.** Picking the luckiest epoch would have overstated performance.
- **Next step:** transfer learning (for example EfficientNet or MobileNet) would likely raise accuracy and robustness to real field photos, which are messier than archive images.

## Links

- Live app: [Pest classifier on Streamlit]({{ page.demo }})
- Code and notebooks: [Deeplearning_Agricultural_pests on GitHub]({{ page.repo }})
