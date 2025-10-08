import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const ProfileCard = () => {
  const leetcode_id = useParams()["leetcode_id"];
  const codeforces_id = useParams()["codeforces_id"];
  const codechef_id = useParams()["codechef_id"];
  const [name, setname] = useState(null);
  const [avatar, setavatar] = useState(null);
  const [country, setcountry] = useState(null);
  const [school, setschool] = useState(null);
  const [github, setgithub] = useState(null);
  const [linkedin, setlinkedin] = useState(null);
  useEffect(() => {
    fetch(
      "https://leetcode-stats.tashif.codes/"
        .concat(leetcode_id)
        .concat("/profile")
    ) // Adjust the path based on your file location
      .then((response) => response.json())
      .then((data) => {
        const name = data.profile.realName;
        const avatar = data.profile.userAvatar;
        const country = data.profile.countryName;
        const school = data.profile.school;
        const github = data.githubUrl;
        const linkedin = data.linkedinUrl;

        setname(name);
        setavatar(avatar);
        setcountry(country);
        setschool(school);
        setgithub(github);
        setlinkedin(linkedin);
      })

      .catch((error) => console.error("Error loading data:", error));
  }, []);
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full border-4 border-gray-800"
          src={avatar}
          alt="Profile"
        />
        <h2 className="mt-4 text-2xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">{leetcode_id}</p>
        <p className="text-sm text-gray-400">{codechef_id}</p>
        <p className="text-sm text-gray-400">{codeforces_id}</p>
      </div>

      {/* Edit Button
      <div className="flex justify-center mt-4">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium">
          Edit Profile
        </button>
      </div> */}

      {/* Additional Info */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <p>{country}</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>

          <p>{school}</p>
        </div>
        <div className="flex items-center space-x-10">
          <a href={github}>
            <FaGithub className="w-7 h-7" />
          </a>
          <a href={linkedin}>
            <FaLinkedin className="w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
