# VisionParse-OCR

A production-grade OCR web application with a ChatGPT-style interface that transforms images into structured text using transformer-based vision models. Supports real-time streaming output, drag-and-drop uploads, GPU/CPU adaptive inference, and a fully containerized setup.

---

# ✨ Features

* 🎯 Drag & Drop Image Upload
* 🖼️ Image Preview Before Processing
* ⚡ Streaming OCR Output (word-by-word)
* 🧠 Transformer-based OCR Model
* 🐳 Fully Dockerized (Zero Manual Setup)
* ⚙️ GPU Auto Detection (Fallback to CPU)
* 🌐 Nginx Reverse Proxy (Production Ready)
* 💬 ChatGPT-like UI Experience

---

# Architecture

```
Frontend (React + Tailwind + Nginx)
            ↓
        API Gateway (/api)
            ↓
Backend (FastAPI)
            ↓
OCR Model (Transformers)
```

---

# Project Structure

```
visionparse-ocr/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   └── routes.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── nginx/
│   └── Dockerfile
│
├── docker-compose.yml
├── Makefile
├── .env
└── README.md
```

---

# Prerequisites

Make sure you have installed:

* Docker
* Docker Compose

(Optional for GPU):

* NVIDIA GPU
* NVIDIA Container Toolkit

---

# Quick Start (Zero Manual Setup)

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/visionparse-ocr.git
cd visionparse-ocr
```

---

## 2. Run the Application

```bash
make up
```

OR

```bash
docker-compose up --build
```

---

## 3. Open in Browser

```
http://localhost:3000
```

---

# How to Use

1. Drag & drop an image OR select file
2. Preview will appear
3. Click **Send**
4. OCR result will stream in real-time

---

# GPU Support (Auto Detection)

The system automatically detects GPU:

* If GPU available → uses CUDA
* Else → runs on CPU

No config required.

---

# Docker Details

## Start

```
make up
```

## Stop

```
make down
```

## Logs

```
make logs
```

---

# Environment Variables

## .env

```
API_URL=http://localhost:8000
DEVICE=auto
```

---

# Backend Dependencies

```
fastapi
uvicorn
transformers
torch
pillow
python-multipart
accelerate
```

---

# API Endpoints

## POST /ocr-stream

### Request

* Form-data: image file

### Response

* Streaming text output

---

# UI Features

* Gradient Theme
* Chat Layout
* Streaming Output Bubble
* File Upload + Drag Drop
* Image Preview

---

# Notes

* First run will download model weights (may take time)
* Streaming is simulated word-by-word
* Large images may take longer

---

# Future Improvements

* PDF OCR (multi-page)
* Batch processing
* Redis caching
* OCR history storage
* Authentication system

---

# Tags

```
ocr, ai, fastapi, react, docker, transformers, computer-vision
```

---

# Summary

VisionParse-OCR is a complete, production-ready OCR system combining modern UI, scalable backend, and AI-powered text extraction — fully automated with Docker for seamless deployment.
