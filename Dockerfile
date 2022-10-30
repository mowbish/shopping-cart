FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install --no-install-recommends -y \
  vim-tiny \
  binutils \
  libproj-dev \
  gdal-bin \
  libsqlite3-mod-spatialite\
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app/src
COPY requirements.in /requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install pip-tools
RUN pip-compile /requirements.txt
RUN pip install -r /requirements.txt