import "./Home.css";
import HomeScreenContent from "../components/HomeScreenContent/HomeScreenContent";
import Sidebar from "../components/Sidebar/Sidebar";
import JobsList from "../components/JobsList/JobsList";
import CandidatesTable from "../components/CandidatesTable/CandidatesTable";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ActivePageContext } from "../contexts/activePageContext";
import Dashboard from "./Dashboard";

function Home() {
  const [activeContent, setActiveContent] = useState("Home");
  const { activePage } = useContext(ActivePageContext);
  return (
    <div className="home-page">
      <Sidebar />
      <Routes>
        <Route
          path=""
          element={<HomeScreenContent homeContent={<Dashboard />} />}
        />
        <Route
          path="dashboard"
          element={<HomeScreenContent homeContent={<Dashboard />} />}        />
        <Route
          path="jobs"
          element={<HomeScreenContent homeContent={<JobsList />} />}
        />
        <Route
          path="/jobs/:id"
          element={<HomeScreenContent homeContent={<CandidatesTable />} />}
        />
      </Routes>
      {/* <HomeScreenContent
        homeContent={
          <CandidatesTable
            job={{
              _id: "649888f24f1ae80d6f20cc50",
              organization: "64982fb0562d63d09259c60c",
              role: "SDE1",
              description: "SDE1 desc",
              skills: ["Python", "DSA"],
              status: "Open",
              __v: 0,
            }}
          />
        }
      /> */}
    </div>
  );
}

export default Home;
