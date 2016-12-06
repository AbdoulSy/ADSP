FROM centos:centos7
MAINTAINER The CentOS Project <cloud-ops@centos.org>

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install python-pip; yum clean all

ADD . /src

RUN cd /src; pip install -r requirements.txt

EXPOSE 8060

# Install Node.js
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

#Install Marklogic
# Install MarkLogic
WORKDIR /tmp
ADD MarkLogic-8.0-20141124.x86_64.rpm /tmp/MarkLogic-8.0-20141124.x86_64.rpm

RUN yum -y install /tmp/MarkLogic-8.0-20141124.x86_64.rpm

ENV MARKLOGIC_INSTALL_DIR /opt/MarkLogic
ENV MARKLOGIC_DATA_DIR /data

ENV MARKLOGIC_FSTYPE ext4
ENV MARKLOGIC_USER daemon
ENV MARKLOGIC_PID_FILE /var/run/MarkLogic.pid
ENV MARKLOGIC_MLCMD_PID_FILE /var/run/mlcmd.pid
ENV MARKLOGIC_UMASK 022

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/MarkLogic/mlcmd/bin
ENV LD_PRELOAD /opt/MarkLogic/lib/libjemalloc.so.1
ENV LD_LIBRARY_PATH /opt/MarkLogic/lib:/data/Lib

# Define mountable directory
VOLUME ["/data"]

# Define working directory
WORKDIR /data

# Define default command (avoid immediate shutdown)
CMD /opt/MarkLogic/bin/MarkLogic && tail -F /data/Logs/ErrorLog.txt

# Expose MarkLogic Server ports
EXPOSE 7997 7999 8000 8001 8002


# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang

# Copy the local package files to the container's workspace.
ADD ./go_adsp_web /go/src/github.com/AbdoulSy/ADSP

# Build the outyet command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
RUN go install github.com/AbdoulSy/ADSP_Web

# Run the outyet command by default when the container starts.
ENTRYPOINT /go/bin/web

# Document that the service listens on port 8080.
EXPOSE 8080


# Define default command.
CMD ["bash"]
