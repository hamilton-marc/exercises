class AppInfo:
    def __init__(self):
        pass

    NAME = "Transaction Parser"
    VERSION = "0.2"


class ConsoleMenu:
    def __setup_valid_menu_items(self):
        """
        Setup a dictionary with the valid menu items.
        """

        self.main_menu = {
            0: "Exit program",
            1: "Choose file type",
            2: "Choose file",
            3: "Parse file",
            4: "Display results"
        }

    def __show_menu_options(self):
        """
        Show the user a menu of options to choose from.
        """

        print("Main Menu")
        print("-----------------------------------------------------")
        for key in self.main_menu:
            print(f'{key:0d}. {self.main_menu.get(key)}')

    @staticmethod
    def __is_valid_menu_choice(menu_choice):
        """
        Validates the user's menu choice. Returns True if the menu
        choice is valid, otherwise returns False.
        """

        try:
            numerical_choice = int(menu_choice)
        except (TypeError, ValueError):
            return False

        if 0 <= numerical_choice <= 4:
            return True

        return False

    def __get_user_choice(self):
        menu_choice = None

        while not self.__is_valid_menu_choice(menu_choice):
            if menu_choice is not None:
                print("Invalid choice. Please try again.")

            menu_choice = input("-> ")
            print("You chose " + menu_choice)

        return menu_choice

    def show_main_menu(self):
        menu_choice = -1

        while menu_choice != str(0):
            self.__show_menu_options()
            menu_choice = self.__get_user_choice()

    def __init__(self):
        self.__setup_valid_menu_items()


def main():
    app_menu = ConsoleMenu()

    print(AppInfo.NAME + " version: " + AppInfo.VERSION)
    app_menu.show_main_menu()


if __name__ == "__main__":
    main()
