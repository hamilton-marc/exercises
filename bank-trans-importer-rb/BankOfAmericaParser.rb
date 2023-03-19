require 'csv'
require 'date'

class BankOfAmericaParser
  attr_accessor :input_file_path
  attr_accessor :file_delimiter
  attr_reader   :discretionary_indicators

  # Parses the input file into a dictionary.
  def parse(file_path=nil)
    @file_path = file_path unless file_path.nil?

    puts
    puts "All Transactions"
    puts "-----------------------"

    CSV.foreach(@file_path, col_sep: @file_delimiter, headers: true, \
                converters: :all, header_converters: :symbol) \
                do |row|
      begin
        Date.strptime(row[:date], "%m/%d/%Y")
        @transactions << row
        puts row
      rescue
        puts "Skipping unparsable row"
      end
    end
  end

  # Using the list of discretionary_transctions, we look for occurrances
  # which contain those strings from the description field of the file that we
  # parsed
  def find_discretionary_transactions
    discretionary_transactions = []
    total_discretionary_amount = 0.00

    puts
    puts "Discretionary Spending"
    puts "-----------------------"

    @transactions.each do |transaction|
      @discretionary_indicators.each do |search_element|
        if transaction[:description].downcase.include? search_element.downcase
          discretionary_transactions << transaction
          total_discretionary_amount += transaction[:valueamount].to_f
          puts transaction
        end
      end
    end

    puts
    puts "Total Discretionary Spending:\t\t%.2f" % total_discretionary_amount.abs
  end

  def initialize_discretionary_indicators
    @discretionary_indicators = [
      "Target",
      "ClubCorp",
      "Xtreme Air",
      "Netflix",
      "Bosa Donuts",
      "McDonald's",
      "PotBelly",
      "Einstein"
    ]
  end

  def initialize(file_path=nil, delimiter=",")
    @input_file_path = file_path
    @file_delimiter = delimiter
    @transactions = []
    self.initialize_discretionary_indicators
  end
end

def main
  input_file = ARGV.first unless ARGV.first.nil?

  parser = BankOfAmericaParser.new
  parser.discretionary_indicators << "ABC*EOS"
  parser.parse input_file
  parser.find_discretionary_transactions
end

if __FILE__ == $0
  main
end
