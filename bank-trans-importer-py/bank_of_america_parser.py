import sys
import csv
from datetime import datetime


class BankOfAmericaParser:
    COLUMN_TRANSACTION_DATE = "transaction_date"
    COLUMN_DESCRIPTION = "description"
    COLUMN_AMOUNT = "amount"
    COLUMN_VALUE = "value"
    COLUMN_DISCRETIONARY = "is_discretionary"
    COLUMN_EXTRA = "extra"

    fields = (
        COLUMN_TRANSACTION_DATE,
        COLUMN_DESCRIPTION,
        COLUMN_AMOUNT,
        COLUMN_VALUE,
        COLUMN_DISCRETIONARY,
        COLUMN_EXTRA
    )

    discretionary_spending_indicators = [
        "Target",
        "ClubCorp",
        "Xtreme Air",
        "Netflix",
        "Bosa Donuts",
        "McDonald's",
        "PotBelly",
        "Einstein"
    ]

    @property
    def input_file_path(self):
        return self.file_path

    @input_file_path.setter
    def input_file_path(self, new_path):
        self.file_path = new_path 

    @property
    def file_delimiter(self):
        return self.delimiter

    @file_delimiter.setter
    def file_delimiter(self, new_delimiter):
        self.delimiter = new_delimiter 

    @property
    def discretionary_indicators(self):
        return self.discretionary_spending_indicators

    def add_discretionary_indicator(self, new_indicator):
        """
        Adds a new search pattern to the list. Note: this is NOT supposed to be a setter!
        """

        self.discretionary_spending_indicators.append(new_indicator)

    def parse(self, file_path=None):
        """
        Parses the input file into a dictionary.
        """

        if file_path is not None:
            self.file_path = file_path

        with open(self.file_path, 'r') as input_file:
            csv_reader = csv.DictReader(input_file, fieldnames=self.fields, delimiter=self.delimiter, quotechar='"')

            # Attempted to use map. This code is a mess though.
            # csv_list = list(map(lambda line: self.delimiter.join(line.values()), csv_reader))
            # print(csv_list)

            i = 0
            for line in csv_reader:
                # print(self.delimiter.join(line.values()))

                # Skip the header row
                if i > 0:
                    try:
                        self.transactions.append({
                            self.COLUMN_TRANSACTION_DATE: datetime.strptime(line[self.COLUMN_TRANSACTION_DATE], "%m/%d/%Y"),
                            self.COLUMN_DESCRIPTION: line[self.COLUMN_DESCRIPTION],
                            self.COLUMN_AMOUNT: float(line[self.COLUMN_AMOUNT])
                        })
                    except ValueError as err:
                        print("Warning: Unable to parse line %d: %s" % (i+1, err))
                i += 1

        print()
        print("All Transactions")
        print("-----------------------")
        for transaction in self.transactions:
            print("%s, %s, %.2f" % (datetime.strftime(transaction[self. COLUMN_TRANSACTION_DATE], "%m/%d/%Y"),
                                    transaction[self.COLUMN_DESCRIPTION], transaction[self.COLUMN_AMOUNT]))

        return self.transactions

    def add_discretionary_indicator(self, new_indicator):
        self.discretionary_indicators.append(new_indicator)

    def find_discretionary_transactions(self):
        """
        Using the list of discretionary_transactions, we look for occurrences
        which contain those strings from the description field of the file that we
        parsed
        """
        discretionary_transactions = []

        print()
        print("Discretionary Spending")
        print("-----------------------")
        
        total_discretionary_amount = 0

        # There's likely a more efficient, but less readable way to do this other than 2 for loops...
        for transaction in self.transactions:
            for search_element in self.discretionary_indicators:
                if search_element.lower() in transaction[self.COLUMN_DESCRIPTION].lower():
                    discretionary_transactions.append(transaction)
                    total_discretionary_amount += transaction[self.COLUMN_AMOUNT]
                    print("%s, %s, %.2f" % (datetime.strftime(transaction[self. COLUMN_TRANSACTION_DATE], "%m/%d/%Y"),
                                            transaction[self.COLUMN_DESCRIPTION], transaction[self.COLUMN_AMOUNT]))

        print()
        print("Total Discretionary Spending:\t\t%.2f" % abs(total_discretionary_amount))

    def __init__(self, file_path=None, delimiter=','):
        self.file_path = file_path
        self.transactions = []
        self.delimiter = delimiter


def main():
    if len(sys.argv) > 1:
        input_file = sys.argv[1]

    parser = BankOfAmericaParser()
    parser.add_discretionary_indicator("ABC*EOS")
    parser.parse(input_file)
    parser.find_discretionary_transactions()


if __name__ == "__main__":
    main()
