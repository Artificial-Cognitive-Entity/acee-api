import React from 'react';
import dogImage from './images/dog-testing.png';
const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Nicholas Procaccio',
      role: 'Project Manager',
      bio: 'As the Project Manager, Nicholas is responsible for overseeing the entire ACEE project, ensuring tasks are completed on schedule. His key contributions include managing the transformation workflow, developing the logic for concurrent data updates, and handling the normalization of data schemas during extraction. Additionally, Nicholas is involved in the extraction process, focusing on loading the extracted data into the database.',
      image: '/path/to/jane-smith.jpg',
    },
    {
      name: 'Joshua Abrams',
      role: 'Data Engineer',
      bio: 'Joshua is also contributing to the data extraction process for ACEE. His key responsibilities include extracting data from sources like Confluence and Google Drive, as well as developing the login API for user authentication.',
      image: '/path/to/jane-smith.jpg',
    },
    {
      name: 'Celina Alzenor',
      role: 'AI Engineer',
      bio: 'Celina is responsible for developing the application components of ACEE. Her primary focus is on building the search functionality, chat interface, and CRUD (Create, Read, Update, Delete) operations for the user API. She is also involved in managing the database, ensuring data integrity and access control.',
      image: '/path/to/mike-johnson.jpg',
    },
    {
      name: 'Mihir Araveeti',
      role: 'AI Engineer',
      bio: 'Mihir is leading the efforts related to embedding models in ACEE. His key responsibilities include model discovery, where he researches and evaluates suitable embedding models for the project. Additionally, Mihir is involved in the front-end development, working on integrating the embedding models with the user interface.',
      image: '/path/to/sarah-lee.jpg',
    },
    {
      name: 'Kayla Douglas',
      role: 'Data Engineer',
      bio: 'Kayla is responsible for the extraction component of the ACEE data pipeline. Her primary focus is on extracting data from sources like Jira, handling email verification and password reset APIs, and ensuring data integrity during the extraction process.',
      image: '/path/to/david-brown.jpg',
    },
  ];

  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-white">
            We are a dynamic group of individuals working together to achieve excellence.
          </p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {teamMembers.map((member) => (
            <li key={member.name} className="rounded-lg bg-purple-900 p-6">
              {/* // eslint-disable-next-line @next/next/no-img-element */}
              <img className="aspect-[3/2] w-full rounded-lg object-cover" src={member.image} alt={member.name} />
              <div className="mt-6">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-white">{member.name}</h3>
                <p className="text-base leading-7 text-white">{member.role}</p>
                <p className="mt-4 text-base leading-7 text-white">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamPage;