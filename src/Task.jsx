class Task{
  constructor(title, is_done = false) {
    this.title = title;
    this.is_done = is_done;
  }
  getTitle(){
    return this.title;
  }
  
  getDoneText(){
    if(this.is_done === false){
      return "Pending"
    }
    else{
      return "Done"
    }
  }

  getDone(){
    return this.is_done;
  }
  setDone(){
    this.is_done = !this.is_done;
  }

}

export default Task