class AppInfo
  class << AppInfo
    def name
      "Transaction Parser"
    end

    def version
      "0.2"
    end
  end
end

class ConsoleMenu

  # Setup a dictionary with the valid menu items.
  def setup_valid_menu_items
    @main_menu = {
        0 => "Exit program",
        1 => "Choose file type",
        2 => "Choose file",
        3 => "Parse file",
        4 => "Display results"
    }
  end

  # Validates the user's menu choice. Returns True if the menu
  #  choice is valid, otherwise returns False.
  def is_valid_menu_choice?(menu_choice)
    begin
      numerical_choice = Integer menu_choice
    rescue ArgumentError
      return false
    end

    if numerical_choice >= 0 and numerical_choice <= 4
      return true
    end

    return false
  end

  def get_user_choice
    menu_choice = 0

    loop do
      print "-> "
      menu_choice = gets.strip
      puts "You chose #{menu_choice}"
      break if is_valid_menu_choice? menu_choice
      puts "Invalid choice. Please try again."
    end

    return menu_choice
  end

  # Show the user a menu of options to choose from.
  def show_menu_options
    puts "Main Menu"
    puts "-----------------------------------------------------"
    @main_menu.each do |key, value|
      puts "#{key}. #{value}"
    end
  end

  def show_main_menu
    loop do
      show_menu_options
      @menu_choice = get_user_choice
      break if @menu_choice == 0.to_s
    end 
  end

  # Constructor sets up the menu  
  def initialize
    setup_valid_menu_items
  end

end

def main
  appMenu = ConsoleMenu.new

  puts "#{AppInfo.name} version: #{AppInfo.version}"
  appMenu.show_main_menu
end

if __FILE__ == $0
  main
end
