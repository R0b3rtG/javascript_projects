async function request(){
  const response = await fetch('https://www.githubstatus.com/api/v2/summary.json')
    .catch(err => {
      document.querySelector('.container').innerHTML = `<h1 style="text-align: center">Content not available :( Please come back later</h1>`;
    });

  const object = await response.json();
  let stats = [];
  for(let i = 0; i < object.components.length; i++){
    if(object.components[i].description != null){
      stats.push({
        name: object.components[i].name,
        status: object.components[i].status,
        description: object.components[i].description,
        updated_at: object.components[i].updated_at
      });
    }
  }

  await createItems(stats);
}

async function createItems(stats){
  let items = '';
  for(let i = 0; i < stats.length; i++){
    let stat = stats[i].status;

    let statusValue = stat == 'operational' ? 'Operational' : stat == 'partial_outage' ? 'Partial Outage' : 'Major Outage';

    let green = 'hsla(138, 96%, 69%, 0.8)'
    let yellow = 'hsla(51, 96%, 69%, 0.8)';
    let red = 'hsla(0, 96%, 69%, 0.8)';

    let statusColor = statusValue == 'Operational' ? green : statusValue == 'Partial Outage' ? yellow : red; 

    date = new Date(stats[i].updated_at);
    let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    let monthInt = date.getMonth() + 1;
    let month = monthInt.toString().length === 1 ? `0${monthInt}` : monthInt;
    let year = date.getFullYear();
    let hours = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
    let minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    let item = `
<div class="status-box">
  <div class="first-half">
    <h3 class="status-name">${stats[i].name}</h3>
    <p class="description">${stats[i].description}</p>
  </div>
  <div class="second-half">
    <h3 class="status" style="background-color: ${statusColor}">${statusValue}</h3>
    <p class="date-updated">Updated at: </br>${day}.${month}.${year} ${hours}:${minutes}</p>
  </div>
</div>`;
    items += item;
  }
  document.querySelector('.container').innerHTML = items;
}

document.querySelector('.refresh').addEventListener('click', request);

window.onload = request();
