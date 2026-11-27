import unittest
from contextlib import redirect_stdout
from datetime import datetime
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory

from bank_of_america_parser import BankOfAmericaParser


class BankOfAmericaParserTests(unittest.TestCase):
    def parse_csv(self, contents):
        with TemporaryDirectory() as directory:
            path = Path(directory) / "synthetic.csv"
            path.write_text(contents, encoding="utf-8")

            with redirect_stdout(StringIO()):
                return BankOfAmericaParser().parse(path)

    def test_skips_header_and_parses_quoted_description(self):
        # A parseable header makes skipping it observable in the returned rows.
        transactions = self.parse_csv(
            "01/01/2000,Synthetic header,0.00\n"
            '03/14/2024,"Sample shop, west",-12.50\n'
        )

        self.assertEqual(transactions, [{
            "transaction_date": datetime(2024, 3, 14),
            "description": "Sample shop, west",
            "amount": -12.5,
        }])

    def test_skips_invalid_rows_and_keeps_subsequent_transactions(self):
        transactions = self.parse_csv(
            "Date,Description,Amount\n"
            "02/30/2024,Invalid date,1.00\n"
            "03/01/2024,Sample credit,2.25\n"
            "03/02/2024,Invalid amount,invalid\n"
            "03/03/2024,Sample debit,-3.75\n"
        )

        self.assertEqual(transactions, [
            {
                "transaction_date": datetime(2024, 3, 1),
                "description": "Sample credit",
                "amount": 2.25,
            },
            {
                "transaction_date": datetime(2024, 3, 3),
                "description": "Sample debit",
                "amount": -3.75,
            },
        ])

    def test_parse_without_file_raises_type_error(self):
        with self.assertRaises(TypeError):
            BankOfAmericaParser().parse()
