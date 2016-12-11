FROM centos:centos7
MAINTAINER The CentOS Project <cloud-ops@centos.org>

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install python-pip; yum clean all

ADD . /src

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
