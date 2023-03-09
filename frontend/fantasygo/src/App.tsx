import { SetStateAction, useEffect, useState } from "react";

function App() {
  const [isBlock, setBlocks] = useState<any[]>([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // useEffect(() => {
  //   fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // }, []);

  useEffect(() => {
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
      .then((res) => res.json())
      .then((data) => {
        setBlocks(data.elements);
        console.log(data.elements);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortPlayersByTotalPoints = () => {
    const sortedPlayers = [...isBlock];
    if (sortOrder === "desc") {
      sortedPlayers.sort((a, b) => b.total_points - a.total_points);
      setSortOrder("asc");
    } else {
      sortedPlayers.sort((a, b) => a.total_points - b.total_points);
      setSortOrder("desc");
    }
    setBlocks(sortedPlayers);
  };

  const filterPlayersByTeam = (isBlock: {
    team: { toString: () => string };
  }) => {
    return teamFilter === "" || isBlock.team.toString() === teamFilter;
  };

  const handleTeamFilterChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTeamFilter(event.target.value);
  };

  const shufflePlayers = () => {
    const shuffledPlayers = [...isBlock];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [
        shuffledPlayers[j],
        shuffledPlayers[i],
      ];
    }
    setBlocks(shuffledPlayers);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row mr-4">
        <button
          className="mt-4 ml-5 px-5 py-2 bg-white rounded-md text-md shadow-lg"
          onClick={sortPlayersByTotalPoints}
        >
          Sort by Total Points
        </button>

        {/* Second part */}
        <button
          onClick={shufflePlayers}
          className="mt-4 ml-5 px-5 py-2 bg-white rounded-md text-md shadow-lg"
        >
          Random shuffle
        </button>

        {/* third part */}
        <div>
          <select
            id="team-filter"
            className="mt-4 ml-5 py-2 pl-2 pr-5 bg-white rounded-md text-md shadow-md"
            value={teamFilter}
            onChange={handleTeamFilterChange}
          >
            <option value="">Filter by Team</option>
            <option value="1">Arsenal</option>
            <option value="2">Aston Villa</option>
            <option value="3">Brentford</option>
            <option value="4">Brighton</option>
            <option value="5">Burnley</option>
            <option value="6">Chelsea</option>
            <option value="7">Crystal Palace</option>
            <option value="8">Everton</option>
            <option value="9">Leeds</option>
            <option value="10">Leicester</option>
            <option value="11">Liverpool</option>
            <option value="12">Man City</option>
            <option value="13">Man Utd</option>
            <option value="14">Newcastle</option>
            <option value="15">Norwich</option>
            <option value="16">Southampton</option>
            <option value="17">Spurs</option>
            <option value="18">Watford</option>
            <option value="19">West Ham</option>
            <option value="20">Wolves</option>
          </select>
        </div>
      </div>

      <div className=" mx-5 my-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 ">
        {isBlock.filter(filterPlayersByTeam).map((block, index) => (
          <div className="container">
            <div
              key={index}
              className="bg-white px-10 py-10 rounded-md border shadow-md"
            >
              <h1 className="text-xl">
                {block?.first_name} {block?.second_name}
              </h1>

              <p>Total points: {block?.total_points}</p>
              <p>Team: {block?.team}</p>
              <p>Minutes: {block?.minutes}</p>
              <p>Form rank: {block?.form_rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
