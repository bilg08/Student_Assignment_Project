import { useEffect, useState } from 'react';
import { Input, Button, Card } from '../components/index'
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import advertisings from "../data/advertisings.json" assert {type: 'json'}
import { useSelectedContext } from '../context/index';
import { useWindowWidth } from '../hooks/index';
import axios from 'axios';

type adsType = {
  advertisingHeader: String,
  detail: String,
  owner: {
    name: String
  },
  createdAt: String
}

type userInputType = {
  subject: String | "subject",
  school: String | "school"
}

export default function Home() {
  const { selectedAd, setSelectedAd } = useSelectedContext()
  const [userInput, setUserInput] = useState<userInputType | object>();
  const [ads, setAds] = useState<adsType[]>(advertisings);
  const [openPostDropDown, setOpenPostDropDown] = useState(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    async function getData() {

      try {
        const datas = await axios.get('http://localhost:8000/posts');
        setAds(datas.data.data)

      } catch (error) { }
    };
    getData()
  }, [])
  const handleSearch = () => {

  }

  return (
    <div className='w-full border-#57534e border-1'>
      <div className='flex h-40  justify-center flex-col items-center md:flex-row m-auto max-w-screen-xl gap-5'>
        <Input placeholder="Сургууль"
          onchange={setUserInput} userInput={userInput}
          icon={<AiOutlineSearch />}
          name="school"
        />
        <Input placeholder="Хичээл" onchange={setUserInput} userInput={userInput} name="subject" icon={<MdLocationOn />} />
        <Button onClick={handleSearch}>Хайх</Button>
      </div>


      <div style={{ backgroundColor: `#f6f5f4` }}>
        <div className="max-w-screen-xl m-auto flex  justify-center items-start">
          <div className='m-5 w-6/12 flex flex-col m-auto gap-10 overflow-scroll'>
            {ads.map((ad, index) => {
              return (
                <Card index={index} key={index}>
                  <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div onClick={() => setOpenPostDropDown(e => !e)} className="flex justify-end px-4 pt-4">
                      <button id="dropdownButton" data-dropdown-toggle="dropdown" className="w-10 h-10  inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                      </button>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      <div onClick={() => setSelectedAd({ ad, index })}>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{ad.advertisingHeader}</h5>
                        {/* <span className="text-sm text-gray-500 dark:text-gray-400">Захиалагч:{ad.owner.name}</span> */}
                        <p>{ad.detail}</p>
                        <p className='text-gray-500'>Зар тавигдсан хугацаа:{ad.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>


          {selectedAd && windowWidth > 935 &&
            <div className={selectedAd ? 'w-6/12' : ''}>
              <div className='fixed'>
                <Card>
                  <Card>
                    <h1 className='text-4xl  font-bold'>{selectedAd.ad.advertisingHeader}</h1>
                    <h3 className='text-2xl font-bold color-silver'>Захиалагч:Билгүүн</h3>
                    <p className='text-gray-500'>Зар тавигдсан хугацаа:{selectedAd.ad.createdAt}</p>
                    <Button>Хийх</Button>
                  </Card>
                  <Card>
                    <p>{selectedAd.ad.detail}</p>
                  </Card>
                </Card>
              </div>

            </div>
          }
        </div>
      </div>
    </div>
  )
}
