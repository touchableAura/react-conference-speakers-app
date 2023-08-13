import SpeakerLine from "./SpeakerLine";
import { useEffect, useState, useReducer, useContext } from "react";
import { ThemeContext } from "../../App";
import axios from "axios";

function List({ state, dispatch }) {
  const [updatingId, setUpdatingId] = useState(0);
  const isPending = false;
  const speakers = state.speakers;

  function toggleFavoriteSpeaker(speakerRec) {
    const speakerRecUpdated = { ...speakerRec, favorite: !speakerRec.favorite };
    // updateSpeaker(speakerRecUpdated);
    dispatch({type: "updateSpeaker", speaker: speakerRecUpdated});
    async function updateAsync(rec) {
      setUpdatingId(rec.id);
      await axios.put(`/api/speakers/${rec.id}`, speakerRecUpdated);
      setUpdatingId(0);
    }
    updateAsync(speakerRecUpdated);
  }

  return (
    <div className="container">
      <div className="border-0">
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Speaker toolbar filter"
        >
          <div className="toolbar-trigger mb-3 flex-grow-04">
            <div className="toolbar-search w-100">
              <input
                value=""
                onChange={(event) => {}}
                type="text"
                className="form-control"
                placeholder="Highlight Names"
              />
            </div>
            <div className="spinner-height">
              {isPending && (
                <i className="spinner-border text-dark" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {speakers.map(function (speakerRec) {
          const highlight = false;
          return (
            <SpeakerLine
              key={speakerRec.id}
              speakerRec={speakerRec}
              updating={updatingId === speakerRec.id ? updatingId : 0}
              toggleFavoriteSpeaker={() => toggleFavoriteSpeaker(speakerRec)}
              highlight={highlight}
            />
          );
        })}
      </div>
    </div>
  );
}

const SpeakerList = () => {
  const{darkTheme} = useContext(ThemeContext);
  // const [speakers, setSpeakers] = useState([]);
  // const [loading, setLoading] = useState(true);
 
  // usually created in their own separate file
  // stay independent to avoid side effects
  // easier to show how it works here altogether 
  function reducer(state, action) {
    switch (action.type) {
       case "speakersLoaded":
        return { ...state, loading: false, speakers: action.speakers };
      case "setLoadingStatus":
        return {...state, loading: true };
      case "updateSpeaker":
        const speakersUpdated = state.speakers.map((rec) => 
        action.speakers.id === rec.id ? action.speaker : rec
        );
        return { ...state, speakers: speakersUpdated };
      default:
        throw new Error(`case failure. type:${action.type}`);
    }
  }

  const initialState = {
    speakers: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getDataAsync() {
      // setLoading(true); // replace with 
      dispatch({ type: "setLoadingStatus" })
      const results = await axios.get("/api/speakers");
      dispatch({ type: "speakersLoaded", speakers: results.data });
      // setSpeakers(results.data);  
      // setLoading(false); // replace with 
    }
    getDataAsync();
  }, []);

  function updateSpeaker(speakerRec) {
    const speakerUpdated = speakers.map(function (rec) {
      return speakerRec.id === rec.id ? speakerRec : rec;
    });
    setSpeakers(speakerUpdated);
  }

  if (state.loading) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <List state={state} dispatch={dispatch} />
      {/* <List speakers={speakers} updateSpeaker={updateSpeaker} /> replaced above */}
    </div>
  );
};

export default SpeakerList;



// import SpeakerLine from "./SpeakerLine";
// // import { speakerList } from "../../../speakersData";
// import { useEffect, useState } from 'react';
// import axios from "axios";

// function List({speakers, updateSpeaker}) {  // speakers is receiving prop
//   const [updatingId, setUpdatingId] = useState(0);
//   const isPending = false;

//   function toggleFavoriteSpeaker(speakerRec) {
//     const speakerRecUpdated = {...speakerRec, favorite: !speakerRec.favorite };
//     updateSpeaker(speakerRecUpdated);
//     async function updateAsync(rec) {
//       setUpdatingId(rec.id);
//       await axios.put(`/api/speakers/${rec.id}`, speakerRecUpdated);
//     };
//     updateAsync(speakerRecUpdated);
//   }

//   return (
//     <div className="container">
//       <div className="border-0">
//         <div
//           className="btn-toolbar"
//           role="toolbar"
//           aria-label="Speaker toolbar filter"
//         >
//           <div className="toolbar-trigger mb-3 flex-grow-04">
//             <div className="toolbar-search w-100">
//               <input
//                 value=""
//                 onChange={(event) => {}}
//                 type="text"
//                 className="form-control"
//                 placeholder="Highlight Names"
//               />
//             </div>
//             <div className="spinner-height">
//               {isPending && (
//                 <i className="spinner-border text-dark" role="status" />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row g-3">
//         {speakers.map(function (speakerRec) {
//           const highlight = false;

//           return (
//             <SpeakerLine
//               key={speakerRec.id}
//               speakerRec={speakerRec}
//               updating={updatingId === speakerRec.id ? updatingId : 0}
//               toggleFavoriteSpeaker={() => toggleFavoriteSpeaker(speakerRec)}
//               highlight={highlight}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // after component renders
// // call REST speakers URL
// // Call setSpeakers to load speakers
// const SpeakerList = () => {
//   const darkTheme = false;
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getDataAsync() {
//       setLoading(true);
//       const results = await axios.get("/api/speakers");
//       setSpeakers(results.data);
//       setLoading(false);
//     }
//     getDataAsync();
//   }, []); // empyty array means only renders once // after component fully renders

//   function updateSpeaker(speakerRec) {

//   }

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={darkTheme ? "theme-dark" : "theme-light"}>
//       <List speakers={speakers} updateSpeaker={updateSpeaker}/>
//     </div>
//   );
// };

// export default SpeakerList;
