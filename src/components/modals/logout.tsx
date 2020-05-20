import React, { Fragment } from "react";
import Transition from "../transition/transition";

type Props = {
  show: boolean;
  setShow: () => void;
  logout: () => void;
};

const LogoutModal = ({ show, setShow, logout }: Props) => {
  return (
    <Fragment>
      <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        <Transition
          show={show}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto">
            <div className="flex rounded-lg shadow-xs">
              <div className="w-0 flex-1 flex items-center p-4">
                <div className="w-full">
                  <p className="text-sm leading-5 font-medium text-gray-900">
                    Logout Request
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Are you sure you want to logout?
                  </p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <div className="-ml-px flex flex-col">
                  <div className="h-0 flex-1 flex border-b border-gray-200">
                    <button onClick={logout} className="-mb-px flex items-center justify-center w-full rounded-tr-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50 transition ease-in-out duration-150">
                      Logout
                    </button>
                  </div>
                  <div className="-mt-px h-0 flex-1 flex">
                    <button
                      onClick={setShow}
                      className="flex items-center justify-center w-full rounded-br-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                    >
                      Cancel Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Fragment>
  );
};

export default LogoutModal;
