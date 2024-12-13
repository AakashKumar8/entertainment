import { Play, Info, Bookmark as DeleteIcon } from "lucide-react"; // Renaming the Bookmark icon
import { useContentStore } from "../../store/content";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate hook
import Navbar from "../../components/Navbar"; // Importing the Navbar
import { useState } from "react";

const Bookmark = () => {
  const { bookmarks, removeBookmark } = useContentStore();
  const [removedId, setRemovedId] = useState(null); // To track which bookmark was removed
  const navigate = useNavigate();

  // Function to handle bookmark removal
  const handleRemoveBookmark = (id) => {
    setRemovedId(id); // Set the removed bookmark id to trigger fade-out effect

    // Delay removing the bookmark to allow for the fade-out transition
    setTimeout(() => {
      removeBookmark(id); // Actually remove it after the animation
    }, 300); // Duration should match the fade-out duration (300ms)
    
    // Navigate to home if there are no bookmarks left
    if (bookmarks.length === 1) {
      navigate("/"); // Navigate to home page when all bookmarks are removed
    }
  };

  // If there are no bookmarks, show the "No bookmarks" message
  if (bookmarks.length === 0) {
    return (
      <div className="text-center text-white py-10 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-4">No bookmarks yet!</h1>
        <p className="text-lg">Start adding content to your bookmarks.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="py-10 px-4 sm:px-8 lg:px-16">
        <h1 className="text-4xl font-extrabold text-center mb-8">Your Bookmarks</h1>

        {/* Grid of Bookmarked Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ${removedId === bookmark.id ? "opacity-50" : ""}`} // Add opacity on remove
            >
              {/* Bookmark Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${bookmark.backdrop_path || bookmark.poster_path}`}
                alt={bookmark.title || bookmark.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold truncate">{bookmark.title || bookmark.name}</h2>
                <p className="text-sm text-gray-400">
                  {bookmark.release_date?.split("-")[0] || bookmark.first_air_date?.split("-")[0]}
                </p>
                <p className="mt-2 text-sm text-gray-300">{bookmark.overview.slice(0, 100)}...</p>

                {/* Action buttons */}
                <div className="flex mt-4 space-x-4">
                  {/* Play button */}
                  <Link
                    to={`/watch/${bookmark.id}`}
                    className="bg-white text-black font-bold py-2 px-4 rounded flex items-center text-xs sm:text-base"
                  >
                    <Play className="mr-1" />
                    
                  </Link>

                  {/* Info button */}
                  <Link
                    to={`/watch/${bookmark.id}`}
                    className="bg-gray-200/30 text-white py-2 px-4 rounded flex items-center text-xs sm:text-base"
                  >
                    <Info className="mr-1" />
                    
                  </Link>

                  {/* Delete bookmark button */}
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.id)}
                    className="bg-red-500/70 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center text-xs sm:text-base"
                  >
                    <DeleteIcon className="mr-1" />
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
