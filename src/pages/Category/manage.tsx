import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideSheet, Spinner, toaster } from "evergreen-ui";
import { get, post } from "../../services/transport";

type Category = {
  name: string;
  description: string;
};

const CategoryComponent = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories]: any = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [add, setAdd] = useState(false);

  useEffect(() => {
    document.title = "Manage Category - Inkognito Admin";
  });

  useEffect(() => {
    setLoading(true);
    get("/categories")
      .then((data: any) => {
        type Results = {
          success: string;
          message: string;
          payload?: any;
        };
        let results: Results = data?.data;
        if (!results.success) {
          toaster.warning("Error", {
            description: results.message,
          });
          return setLoading(false);
        }
        setCategories(results.payload);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toaster.warning("Error", {
          description: e.message,
        });
      });
  }, []);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    post("/categories", { name, description })
      .then((data: any) => {
        type Results = {
          success: string;
          message: string;
          payload?: any;
        };
        let results: Results = data?.data;
        if (!results.success) {
          toaster.warning("Error", {
            description: results.message,
          });
          return setLoading(false);
        }
        setCategories([...categories, results.payload]);
        setLoading(false);
        toaster.success("Hurray", {
          description: results.message,
        });
        setAdd(false);
        handeInit();
      })
      .catch((e) => {
        setLoading(false);
        toaster.warning("Error", {
          description: e.message,
        });
      });
  };

  const handeInit = () => {
    setName("");
    setDescription("");
  };
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
                    to="/categories"
                    className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    Manage Categories
                  </Link>
                </nav>
              </div>
              <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                    Manage Categories
                  </h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                  <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => setAdd(true)}
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white  hover:bg-purple-500 hover:text-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800"
                    >
                      <span>Add Category</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={"mt-5"}>
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
            ) : categories.length === 0 ? (
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
                  No categories
                </div>
              </Fragment>
            ) : (
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 lg:max-w-none">
                  {categories.map((cat: Category, i: any) => (
                    <Fragment key={i}>
                      <div className="flex flex-col  rounded-lg shadow-lg overflow-hidden">
                        <div className="hover:bg-gray-50 transition ease-in duration-300 flex-1 bg-white p-6 flex flex-col justify-between">
                          <div className="flex-1">
                            <a href="#" className="block">
                              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                                {cat.name}
                              </h3>
                              <p className="mt-3 text-base leading-6 text-gray-500">
                                {cat.description.length > 50 ? `${cat.description.slice(0,50)}...` : cat.description}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <SideSheet
        isShown={add}
        onCloseComplete={() => setAdd(false)}
        width={400}
      >
        <Fragment>
          <div className={"h-full bg-gray-100"}>
            <div className={"bg-white w-full p-4"}>Add Category</div>
            <div className={"m-5 rounded shadow-lg bg-white p-4"}>
              <form onSubmit={handleSubmit}>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="first_name"
                    required={true}
                    placeholder={"Category Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-2 rounded-md shadow-sm">
                  <textarea
                    id="first_name"
                    required={true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Category Description"}
                    rows={10}
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <span className="block w-full inline-flex mt-2 rounded-md shadow-sm">
                  <button
                    disabled={loading}
                    type="submit"
                    className="py-2 w-full px-4 border border-gray-300 bg-indigo-500 rounded-md text-sm leading-5 font-medium text-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </span>
              </form>
            </div>
          </div>
        </Fragment>
      </SideSheet>
    </Fragment>
  );
};

export default CategoryComponent;
