export default function FavoriteSpeakerToggleLine({
  speakerRec,
  toggleFavoriteSpeaker,
  children,
}) {
  return (
    <button
      className={
        speakerRec.favorite ? "heartredbutton btn" : "heartdarkbutton btn"
      }
      onClick={toggleFavoriteSpeaker}
    >
      {children}
    </button>
  );
}

// example of prop drilling
// prop drilling is generally not recomended
// bc it adds complexity to your app
// can be dealt with with React Context hook
// current version is pure = no side effects
// react only needs to rerender this page when 
// the rerender only happens when passed in values change
 

