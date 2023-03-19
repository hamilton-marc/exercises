# bank_trans_importer

Imports a flat file of bank transactions that were exported.  Targeted to support Bank of America.

Sample Usage:

    pipenv run python main.py

    pipenv run python bank_of_america_parser.py data/SpendingReport.csv | tee output.txt
