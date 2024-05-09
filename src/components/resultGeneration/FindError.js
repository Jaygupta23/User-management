import React, { useContext, useRef, useState } from "react";
import ResultGenerationContext from "../../Store/ResultGenerationContext";
import { toast } from "react-toastify";

function FindError() {
  const ctx = useContext(ResultGenerationContext);
  const dataHeaders = ctx.dataHeaders;
  const [rollErrorFieldOpen, SetRollErrorFieldOpen] = useState(false);
  const [barCodeErrorFieldOpen, SetBarCodeErrorFieldOpen] = useState(false);
  const barCodeValue = useRef(null);
  const RollNoValue = useRef(null);
  let [duplicateDataArray, setDuplicateArray] = useState([]);
  const [findSuccess, setFindSuccess] = useState(false);
  const dataDuplicateFinder = () => {
    let DataArray = [];
    if (RollNoValue.current == null) {
      toast.error("select roll no field in data duplicate section");
      return;
    }
    if (barCodeValue.current == null) {
      toast.error("select barcode no field in data duplicate section");
      return;
    }
    setFindSuccess(true);

    for (let i = 1; i < dataHeaders.length; i++) {
      for (let j = 1; j < dataHeaders.length; j++) {
        if (
          i != j &&
          dataHeaders[i][RollNoValue.current] ==
            dataHeaders[j][RollNoValue.current]
        ) {
          DataArray.push({
            roll: dataHeaders[i][RollNoValue.current],
            barCode: dataHeaders[i][barCodeValue.current],
          });

          break;
        }
      }
    }
  if(DataArray.length==0){
toast.success("no roll no duplicated")
  }
    setDuplicateArray(DataArray);
    console.log(duplicateDataArray);
  };
  return (
    <div className="m-2 mt-10 w-[100%]  pe-4">
      <div className="flex justify-center">
        <div
          className={`mb-8 animate__animated animate__zoomInUp animate__delay-2s w-[100%] max-w-[600px] h-fit bg-gradient-to-r from-red-600 to-yellow-500 pb-8 rounded-lg shadow-md shadow-gray-500 h-[260px]`}
          style={{ filter: "" }}
        >
          <div className="flex justify-center ">
            <p className="font-bold pt-8 pb-2 text-2xl border-b-2 border-grey-500 text-white">
              Find Duplicate in Data File
            </p>
          </div>
          <div className="flex  flex-col  items-center my-4">
            <div className="flex  px-12  items-center justify-between w-[100%]">
              <div>
                <p className="w-[130px] text-center my-2 text-[1.1rem] font-bold ">
                  Roll No
                </p>
                <div className="flex    items-center justify-between w-[100%]">
                  <div className="w-[130px] border-2 border-white max-h-[130px]">
                    <div className="w-full text-center  text-white font-bold">
                      {!RollNoValue.current ? (
                        <p
                          onClick={() => {
                            SetRollErrorFieldOpen(!rollErrorFieldOpen);
                          }}
                        >
                          select value ...
                        </p>
                      ) : (
                        <p
                          onClick={() => {
                            SetRollErrorFieldOpen(!rollErrorFieldOpen);
                          }}
                        >
                          {RollNoValue.current}
                        </p>
                      )}
                      {rollErrorFieldOpen && (
                        <div className="w-full h-[90px]  overflow-y-scroll">
                          {dataHeaders[0].map((current) => {
                            return (
                              <p
                                onClick={() => {
                                  SetRollErrorFieldOpen(!rollErrorFieldOpen);
                                  RollNoValue.current = current;
                                }}
                              >
                                {current}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="w-[130px] text-center my-2 text-[1.1rem] font-bold ">
                  Barcode No
                </p>
                <div className="flex    items-center justify-between w-[100%]">
                  <div className="w-[130px] border-2 border-white max-h-[130px]">
                    <div className="w-full text-center text-white font-bold">
                      {!barCodeValue.current ? (
                        <p
                          onClick={() => {
                            SetBarCodeErrorFieldOpen(!barCodeErrorFieldOpen);
                          }}
                        >
                          {" "}
                          select value ...
                        </p>
                      ) : (
                        <p
                          onClick={() => {
                            SetBarCodeErrorFieldOpen(!barCodeErrorFieldOpen);
                          }}
                        >
                          {" "}
                          {barCodeValue.current}
                        </p>
                      )}
                      {barCodeErrorFieldOpen && (
                        <div className="w-full h-[90px]  overflow-y-scroll">
                          {dataHeaders[0].map((current) => {
                            return (
                              <p
                                onClick={() => {
                                  SetBarCodeErrorFieldOpen(
                                    !barCodeErrorFieldOpen
                                  );
                                  barCodeValue.current = current;
                                }}
                              >
                                {current}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 w-full flex  justify-center">
              <div className="mx-12 w-full bg-white  ">
                <div className="flex items-center justify-center">
                  <p className="flex-1 border-r-2 text-center font-bold  bg-blue-400 text-white">
                    Roll no
                  </p>
                  <p className="flex-1 border-r-2 text-center font-bold  bg-blue-400 text-white">
                    Barcode no
                  </p>
                </div>

                <div
                  className="flex flex-col  border-t-2 overflow-y-scroll max-h-[80px]"
                  style={{ scrollbarWidth: "none" }}
                >
                  {duplicateDataArray.map((current) => {
                    return (
                      <div className="flex w-full">
                        {" "}
                        <p className="flex-1 border-r-2 text-center ">
                          {current.roll}
                        </p>
                        <p className="flex-1 border-r-2 text-center">
                          {current.barCode}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <p
                className="p-2 bg-blue-100 rounded-md cursor-pointer font-bold shadow-md shadow-black hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  dataDuplicateFinder();
                }}
              >
                Find Duplicate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindError;
