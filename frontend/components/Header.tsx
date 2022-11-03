import { useRouter } from "next/router";
export const Header = () => {
  const router = useRouter();
  return (
    <header>
      <nav className="bg- border-gray-200  py-2.5 border-#57534e border-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen ">
          <div className="flex justify-center items-center">
            <a onClick={() => router.push("/")} className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                className="mr-3 h-6 sm:h-9"
                alt=""
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                React
              </span>
            </a>

            <ul className="flex  font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Ажил Хайх
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Эрэлттэй хүмүүс
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Холбоо барих
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <a
              onClick={() => router.push("loginPage")}
              className="text-gray-800 bg-[#000] dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Нэвтрэх/Бүртгүүлэх
            </a>
            {/* <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex bg-[#000] items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            </button> */}
            <a
              onClick={() => router.push("profile")}
              className="text-gray-800 bg-[#000] dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Миний хэсэг
            </a>

          </div>
        </div>
      </nav>
    </header>
  );
};
