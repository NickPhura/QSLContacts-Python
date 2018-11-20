# latest python
FROM python:3.7-alpine

# add user
RUN adduser -D backend-qsl-contacts-py

# set working directory
WORKDIR /home/backend-qsl-contacts-py

# get dependency packages
COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

# copy source files
COPY app app
# COPY migrations migrations
COPY backend-qsl-contacts.py config.py boot.sh ./

# add permissions to boot script
RUN chmod +x boot.sh

# set environment variables
ENV FLASK_APP backend-qsl-contacts.py

# give user permissions
RUN chown -R backend-qsl-contacts-py:backend-qsl-contacts-py ./
USER backend-qsl-contacts-py

# expose ports
EXPOSE 5000

# set entrypoint
ENTRYPOINT ["./boot.sh"]