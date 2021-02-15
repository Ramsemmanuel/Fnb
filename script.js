var audio = document.getElementById('audio');
var playpause = document.getElementById("play");


function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
   } else {
      playpause.title = "Play";
      audio.pause();
   }
}


//CREATING MENUS

var  menu = [
   {No: 1, Name: 'Black Coffee', Duration: '9:27'},
   {No: 2, Name: 'DJ Tira', Duration: '4:54'},
   {No: 3, Name: 'DJ Fresh', Duration: '6:34'},
   {No: 4, Name: 'DJ Christo', Duration: '3:08'},
   
   
]
   
   
   menu.map((m)=>{
   
   //Highlight first menu
   var highlight = '';
   if(m.No == 1){
      highlight = 'style="color: #ff564c;"';
   }
   var li = $('<li/>')
   li.addClass('song')
           .attr('draggable', 'true')
           .html(`<div class="title"> <h6 ${highlight}>${m.Name}</h6> <h6></h6> </div>
               <div class="length"> <h5>${m.Duration}</h5> <h5></h5> </div>
               <div class="length"> <input type="checkbox" id="heart${m.No}"> <label class="zmr" for="heart${m.No}"></label></div>
			   <div class="length"> <input type="checkbox" id="like${m.No}" class="likeCHK"> <label class="like" for="like${m.No}"></label></div>			   
			   <div class="length"> <input type="checkbox" index="${m.No}" class="delete-item" id="delete${m.No}" onclick="onDelete(this)"> <label class="remove" for="delete${m.No}"></label></div>`)
           .appendTo($('#items-list'));
   
 })




let items = document.querySelectorAll('#items-list > li')

items.forEach(item => {
  $(item).prop('draggable', true)
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('drop', dropped)
  item.addEventListener('dragenter', cancelDefault)
  item.addEventListener('dragover', cancelDefault)
})

function dragStart (e) {
  var index = $(e.target).index()
  e.dataTransfer.setData('text/plain', index)
}

function dropped (e) {
  cancelDefault(e)
  
  // get new and old index
  let oldIndex = parseInt(e.dataTransfer.getData('text/plain'))
  let target = $(e.target).closest('li') //  $(e.target.parentNode.parentElement)//$(e.target)
  let newIndex = target.index()
  
  // remove dropped items at old place
  let dropped = $(this).parent().children().eq(oldIndex).remove()

  // insert the dropped items at new place
  if (newIndex < oldIndex) {
    target.before(dropped)
  } else {
    target.after(dropped)
  }
}

function cancelDefault (e) {
  e.preventDefault()
  e.stopPropagation()
  return false
}

//Handle add click
$('#btnAdd').click(()=>{

  
   var num = menu.length + 1;
   menu.push({No: num, Name: 'Playlist '+num, Duration: '3:27'})
   
   var li = $('<li/>')
   li.addClass('song')
           .attr('draggable', 'true')
           .html(`<div class="title"> <h6>Playlist ${num}</h6> <h6></h6> </div>
               <div class="length"> <h5>5:00</h5> <h5></h5> </div>
               <div class="length"> <input type="checkbox" id="heart${num}"> <label class="zmr" for="heart${num}"></label></div>
			   <div class="length"> <input type="checkbox" id="like${num}" class="likeCHK"> <label class="like" for="like${num}"></label></div>			   
			   <div class="length"> <input type="checkbox" index="${num}" class="delete-item" id="delete${num}" onclick="onDelete(this)"> <label class="remove" for="delete${num}"></label></div>`)
           .appendTo($('#items-list'));
		   
})

//Handle delete
function onDelete(e){
  
  if(menu.length <= 5){
	 alert('Minimum 5 playlist required...')
	 return
  }
  
  var index = parseInt($(e).attr('index'));
  menu = menu.filter(x=>x.No != index)
  $(e).closest('li').remove()
  
}


$('#magicButton').click(()=>{  $('#btnAdd').toggle()  })

