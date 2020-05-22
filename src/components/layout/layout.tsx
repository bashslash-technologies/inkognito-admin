import React, { Fragment, useState, useEffect, Suspense, lazy } from "react";
import Transition from "../transition/transition";
import { LogoutModal } from "../modals";
import { Link, useHistory, useLocation, Switch } from "react-router-dom";
import routes from "../../routes";
import PrivateRoute from "../privateRoute";
import { Spinner } from "evergreen-ui";
import Auth from "../../services";

interface Props {}

const loading = (props: Props) => {
  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    </Fragment>
  );
};

const LayoutComponent = (props: Props) => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    setShowModal(false);
    Auth.clearCipher();
    push("/login");
  };
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={require("../../logo.svg")}
                    alt="Workflow logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={require("../../logo.svg")}
                    alt="Workflow logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex">
                  <Link
                    to="/"
                    className={`inline-flex items-center px-1 pt-1 ${
                      pathname === "/"
                        ? "border-b-2 border-indigo-500"
                        : "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/categories"
                    className={`ml-8 inline-flex items-center px-1 pt-1 ${
                      pathname === "/categories"
                        ? "border-b-2 border-indigo-500"
                        : "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Categories
                  </Link>
                  <Link
                    to="/vendors"
                    className={`ml-8 inline-flex items-center px-1 pt-1 ${
                      pathname === "/vendors"
                        ? "border-b-2 border-indigo-500"
                        : "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Vendors
                  </Link>
                  <Link
                    to="/couriers"
                    className={`ml-8 inline-flex items-center px-1 pt-1 ${
                      pathname === "/couriers"
                        ? "border-b-2 border-indigo-500"
                        : "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Couriers
                  </Link>{" "}
                  <Link
                    to="/customers"
                    className={`ml-8 inline-flex items-center px-1 pt-1 ${
                      pathname === "/customers"
                        ? "border-b-2 border-indigo-500"
                        : "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Consumers
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setShow(!show)}
                      className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  <Transition
                    show={show}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                        >
                          Settings
                        </a>
                        <a
                          onClick={() => {
                            setShow(false);
                            setShowModal(true);
                          }}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:hidden">
            <div className="pt-2 pb-3">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
              >
                Dashboard
              </Link>
              <Link
                to="/vendors"
                className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Vendors
              </Link>
              <Link
                to="/couriers"
                className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Couriers
              </Link>
              <Link
                to="/customers"
                className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Consumers
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-6 text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-5 text-gray-500">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div
                className="mt-3"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Suspense fallback={loading({})}>
          <Switch>
            {routes.map((screen, i) => (
              <PrivateRoute
                key={i}
                component={screen.component}
                exact={screen.exact}
                path={screen.path}
              />
            ))}
          </Switch>
        </Suspense>
      </div>
      <LogoutModal
        show={showModal}
        setShow={() => setShowModal(false)}
        logout={handleLogout}
      />
    </Fragment>
  );
};

export default LayoutComponent;
