import { useState } from "react"
import { videos } from "../components/constants"
import ReactPlayer from "react-player"

const Courses = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="screen flex overflow-auto">
      <div className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto bg-[rgb(33,33,33)] pb-9 pt-9 max-md:hidden">
        <div className="flex w-full flex-col gap-4 px-6">
          {videos.map((video, i) => {
            const isActive = videos[i].title === video.title;
            return (
              <div key={i} className={`relative flex justify-start ${isActive && "bg-primary-500"}`}>
                <p onClick={() => setIndex(i)} className="text-xl text-[#f5f5f5] cursor-pointer hover:underline">{video.title}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* player */}
      <div className="h-screen w-full bg-black p-12 overflow-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-bold uppercase text-2xl font-sans text-white">Video</h3>

          <div className="flex justify-end gap-6 mt-6">
            <button
              disabled={index === videos.length - 1}
              className="bg-white font-bold rounded-md px-3 p-1 hover:opacity-90"
              onClick={() => setIndex((prev) => prev + 1)}
            >
              NEXT
            </button>

            <button
              disabled={index === 0}
              className="bg-white font-bold rounded-md px-3 p-1 hover:opacity-90"
              onClick={() => setIndex((prev) => prev - 1)}
            >
              PREV
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white w-full h-[calc(100%-6%)] rounded-md">
          <ReactPlayer url={videos[index].url} width="100%" height="100%" controls />
        </div>

      </div>
    </div>
  )
}

export default Courses;
