:

MLUSER="writer"
MLPASS="fiokdelkof"

echo "Loading ../ADSP.ontology.ttl ${MLUSER} '${MLPASS}'"
##Note: we recommend using Turtle when working with dbpedia

mlcp.sh import -mode local \
-host localhost -port 8006 -username "${MLUSER}" \
-input_file_path "../ADSP.ontology.ttl" \
-password "${MLPASS}" \
-input_file_type RDF \
-output_collections "http://aria.abdoulsy.eu/collections/adsp" \
-output_uri_prefix "/triplestore/adsp/"

