import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../services/transport";
import { Spinner, toaster } from "evergreen-ui";

const ManageVendors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect((): any => {
    document.title = "Vendors - Inkognito Admin";
  });

  useState((): any => {
    (async () => {
      type Results = {
        success: string;
        message: string;
        payload?: any;
      };
      try {
        setLoading(true);
        let response: any = await get("/users?role=VENDOR");
        let results: Results = response.data;
        if (!results.success)
          return toaster.warning("Error", {
            description: results.message,
          });
        setData(results.payload?.users);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e?.message);
      }
    })();
  });
  return (
    <Fragment>
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <div>
                <nav className="sm:hidden">
                  <a
                    href="#"
                    className="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    <svg
                      className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Back
                  </a>
                </nav>
                <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    Home
                  </Link>
                  <svg
                    className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    to="/vendors"
                    className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    Manage Vendors
                  </Link>
                </nav>
              </div>
              <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                    Manage Vendors
                  </h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
              </div>
            </div>
          </div>
        </header>
        <main>
          {loading ? (
            <Fragment>
              <div
                style={{
                  height: "50vh",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {data.length === 0 ? (
                <Fragment>
                  <div
                    style={{
                      height: "50vh",
                      width: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No vendors registered...
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                      <div className="flex flex-col">
                        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                              <thead>
                                <tr>
                                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Seller
                                  </th>
                                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                  </th>
                                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    business name
                                  </th>
                                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((consumer: any, i) => (
                                  <Fragment key={i}>
                                    <tr
                                      className={`${
                                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                      }`}
                                    >
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        <div className="text-sm leading-5 text-gray-900">
                                          {consumer?.name}
                                        </div>
                                        <div className="text-sm leading-5 text-gray-500">
                                          {consumer?.email}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        +{consumer?.contact}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {consumer?.business_name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        <span
                                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                                            consumer?.documents?.licence
                                              ?.verified &&
                                            consumer?.documents?.identification
                                              ?.verified
                                              ? "green"
                                              : "red"
                                          }-100 text-${
                                            consumer?.documents?.licence
                                              ?.verified &&
                                            consumer?.documents?.identification
                                              ?.verified
                                              ? "green"
                                              : "red"
                                          }-800`}
                                        >
                                          {consumer?.documents?.licence
                                            ?.verified &&
                                          consumer?.documents?.identification
                                            ?.verified
                                            ? "Active"
                                            : "Inactive"}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                        <Link
                                          to={{
                                            pathname: `/vendors/${consumer._id}`,
                                            state: { data: consumer },
                                          }}
                                          className="text-indigo-600 hover:text-white bg-gray-50 border border-gray-500 p-2 rounded hover:bg-gray-500"
                                        >
                                          View
                                        </Link>
                                      </td>
                                    </tr>
                                  </Fragment>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
        </main>
      </div>
    </Fragment>
  );
};

export default ManageVendors;
