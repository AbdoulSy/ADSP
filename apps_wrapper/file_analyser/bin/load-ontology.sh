MLUSER="writer"
MLPASS="fiokdelkof"

echo "Loading ../o.ttl ${MLUSER} '${MLPASS}'"
##Note: we recommend using Turtle when working with dbpedia

mlcp.sh import -mode local \
-host localhost -port 8006 -username "${MLUSER}" \
-input_file_path  "./apps_wrapper/management/ontologies/o.ttl" \
-password "${MLPASS}" \
-input_file_type rdf \
-output_collections "ontologies" \
-output_uri_prefix "/triplestore/adsp/"

