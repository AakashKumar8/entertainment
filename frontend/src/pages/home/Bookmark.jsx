import { Play, Info, Bookmark as  DeleteIcon } from "lucide-react"; // Renaming the Bookmark icon
import { useContentStore } from "../../store/content";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Importing the Navbar

const Bookmark = () => {
  const { bookmarks, removeBookmark } = useContentStore();

  const handleRemoveBookmark = (id) => {
    removeBookmark(id);
  };

  if (bookmarks.length === 0) {
    return <div className="text-center text-white py-10">No bookmarks yet!</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar /> {/* Navbar */}
      <div className="py-10 px-4 sm:px-8 lg:px-16">
        <h1 className="text-4xl font-extrabold text-center mb-8">Your Bookmarks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {/* Bookmark Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${bookmark.backdrop_path || bookmark.poster_path}`}
                alt={bookmark.title || bookmark.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold truncate">{bookmark.title || bookmark.name}</h2>
                <p className="text-sm text-gray-400">{bookmark.release_date?.split("-")[0] || bookmark.first_air_date?.split("-")[0]}</p>
                <p className="mt-2 text-sm text-gray-300">{bookmark.overview.slice(0, 100)}...</p>
                
                <div className="flex mt-4 space-x-4">
                  <Link
                    to={`/watch/${bookmark.id}`}
                    className="bg-white text-black font-bold py-2 px-4 rounded flex items-center text-xs sm:text-base"
                  >
                    <Play className="mr-1" />
                    
                  </Link>

                  <Link
                    to={`/watch/${bookmark.id}`}
                    className="bg-gray-200/30 text-white py-2 px-4 rounded flex items-center text-xs sm:text-base"
                  >
                    <Info className="mr-1" />
                    
                  </Link>

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
