import React from "react";
import { FaGoogleDrive, FaConfluence, FaJira } from "react-icons/fa";

const FeaturesPage = () => {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Powerful Features for Your Enterprise
          </h2>
          <p className="mt-4 text-lg text-white">
            ACEE offers a suite of capabilities to streamline data access and
            boost productivity.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div className="flex space-x-4">
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <FaGoogleDrive className="h-6 w-6 text-white" />
                    </span>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <FaConfluence className="h-6 w-6 text-white" />
                    </span>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <FaJira className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Centralized Knowledge Base
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Consolidates data from Jira, Confluence, Google Drive, and
                    more into a unified, searchable repository.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Conversational AI Interface
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Enables natural language querying of the knowledge base to
                    find relevant answers quickly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Secure Access Controls
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Role-based permissions ensure data privacy and that users
                    only see information they are authorized for.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Productivity Enhancements
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Recommends related information, automates repetitive
                    queries, and integrates with collaboration tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Seamless Integrations
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Connects with your existing enterprise tech stack to unify
                    data and enable cross-functional collaboration.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-purple-900 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-purple-600 p-3 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                    Intelligent Insights
                  </h3>
                  <p className="mt-5 text-base text-white">
                    Leverages AI and machine learning to surface trends, flag
                    issues, and provide proactive recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
