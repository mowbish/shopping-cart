FROM python:3.9

ENV PIP_DISABLE_PIP_VERSION_CHECK=1
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

COPY requirements.txt /requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install pip-tools
RUN pip install -r /requirements.txt