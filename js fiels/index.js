const showData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {

      let aiData02 = data.data.tools;
      displayData(aiData02 , 6);

      const seeMore = document.getElementById("see-more-btn");
      seeMore.classList.remove('hidden');
      
      seeMore.addEventListener("click", function () {
        seeMore.classList.add('hidden');
        displayData(aiData02);
      });
    });
};


const displayData = (aiData02 , limit) => {

const aiData =  aiData02.slice(0,limit);
  
  const aiGridSection = document.getElementById("ai-grid-section");
  aiData.forEach((aiCompany) => {
    console.log(aiCompany.id);
    const createAiDiv = document.createElement("div");
    createAiDiv.classList.add("p-5");
    createAiDiv.classList.add("border");
    createAiDiv.classList.add("rounded-2xl");
    createAiDiv.innerHTML = `
            
                    <div class="border-b-2">
                        <img  src="${
                          aiCompany.image ? aiCompany.image : "ai.jpg"
                        }" class="rounded-2xl" alt="">
                    <h5 class="text-2xl py-4 font-semibold">Features</h5>
                    <p class="text-lg text-slate-600 py-1">1. ${
                      aiCompany.features[0]
                    }</p>
                    <p class="text-lg text-slate-600 py-1">2. ${
                      aiCompany.features[1]
                    }</p>
                    <p class="text-lg text-slate-600 py-1 pb-6">3. ${
                      aiCompany.features[2]
                        ? aiCompany.features[2]
                        : "That's it !"
                    }</p>
                    </div>
                    <div class="flex pt-5 justify-between">
                        <div>
                            <h4 class="text-2xl font-semibold  pb-2">${
                              aiCompany.name
                            }</h4>
                            <p class="text-slate-600">Date : <span>11/01/2022</span> </p>
                        </div>
                        <div >
                            <button  onclick="aiModal(${
                              aiCompany.id
                            })" class="bg-red-100  text-red-700 px-3  py-2 rounded-full"><i class="fa-solid fa-arrow-right"></i></button>
                            
                            
    </div>
    </div>
            `;
    aiGridSection.appendChild(createAiDiv);
  });
};



const aiModal = (ID) => {
  console.log(ID);
  fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${ID > 9 ? ID : "0" + ID}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const dialog = document.getElementById("my_modal_4");
      dialog.showModal();
      const aiData = data.data;

      dialog.innerHTML = `
      <div class="modal-box w-11/12 max-w-5xl md:px-16 md:py-8">
      <div class="grid md:grid-cols-2 gap-7 ">
          <div class="bg-red-50 border-2 rounded-xl border-red-400 p-4">
              <h5 class="text-xl font-semibold">${aiData.description}</h5>
             

              <div class=" grid grid-cols-3  gap-2 py-4">
                  <p class="bg-white flex  text-green-500 font-semibold md:text-lg text-center text-xs rounded-xl items-center  p-2 md:p-5">${
                    aiData.pricing[0].price
                  } ${aiData.pricing[0].plan} </p>
                  <p class="bg-white text-orange-500 flex font-semibold md:text-lg text-xs text-center items-center rounded-xl p-2 md:p-5">${
                    aiData.pricing[1].price
                  } ${aiData.pricing[1].plan} </p>
                  <p class="bg-white text-red-500 flex font-semibold md:text-lg text-xs text-center items-center rounded-xl p-2 md:p-3">${
                    aiData.pricing[2].price
                  } ${aiData.pricing[2].plan} </p>
              </div>
              <div class="grid grid-cols-2">
                 <div>
                  <h6 class="text-xl font-bold">Features</h6>
                  <ul class = "pt-2">
                      <li class="text-xs text-slate-500">. ${
                        aiData.features[1].feature_name
                      }</li>
                      <li class="text-xs py-1 text-slate-500">. ${
                        aiData.features[2].feature_name
                      }</li>
                      <li class="text-xs text-slate-500">. ${
                        aiData.features[3].feature_name
                      }</li>
                  </ul>
                 </div>
                 <div>
                  <h6 class="text-lg font-bold">Integrations</h6>
                  <ul class = "pt-2">
                      <li class="text-xs text-slate-500">. ${
                        aiData.integrations[0]
                      }</li>
                      <li class="text-xs py-1 text-slate-500">. ${
                        aiData.integrations[1]
                      }</li>
                      <li class="text-xs text-slate-500">. ${
                        aiData.integrations[2]
                      }</li>
                  </ul>
                 </div>
              </div>


          </div>
          <div class=" border-2 border-red-400 rounded-xl p-7">
              <img class="rounded-xl" src="${
                aiData.image_link[0]
                  ? aiData.image_link[0]
                  : aiData.image_link[1]
              }" alt="">
              <h5 class="text-xl text-center py-8 font-bold">${
                aiData.input_output_examples[0].input
              }</h5>
              <p class="text-xs text-center text-slate-700">${
                aiData.input_output_examples[0].output
              }</p>
              </div>


          </div>
         
      </div>
      <div class="modal-action">
          <form method="dialog">

              <button class="btn">Close</button>
          </form>
      </div>
  </div>
      `;
    });
};
showData();