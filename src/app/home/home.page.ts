import { Component } from '@angular/core';
import { GetquestionsService } from "../getquestions.service";
import { ToastController } from '@ionic/angular';
// declare var jquery:any;
declare var $ :any;
import questionsoffline from "../../assets/offlinequestions.json";
import myscore from "../../assets/scoreboard.json";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  styles: [`ion-content{background-color:var(--ion-background-color)}`],
})
export class HomePage {

  public answer_options: Array<string>;
  public question:String;
  public correct_ans:String;
  private getquest: GetquestionsService;
  public points : number;
  private counter : number;
  private questions = questionsoffline['questions'];
  private sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  public items: any;
  public selectedItem :{};

  constructor(private getquestion: GetquestionsService,
              private toastController: ToastController) {
    this.getquest = this.getquestion;
    let hmm = this.getQuestion();
    this.question = "";
    this.answer_options = ["","",""];
    this.correct_ans = ""
    this.answer_options.push(this.correct_ans.toString());
    this.points = 1100;
    this.counter = 1;
    this.points = myscore['score'];
    this.items = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
      { number: 8 },
      { number: 9 },
      { number: 10 },
      { number: 11 },
      { number: 12 },
      { number: 13 },
      { number: 14 },
      { number: 15 }
    ];
    this.selectedItem = this.items[2];
    // this.getNewBackGround();
  }

  public selectanswer(event: any, ans: string, correct_ans: { toString: () => any; }) {
    // try{
      var w =$("ion-button");
      console.log(w);
      if (ans === correct_ans.toString()){this.increasePoints();}
      for(var i=2;i<w.length;i++){
        var x = w[i].children;
        x[0].addClass("answertext");
        if (ans === w[i].id && ans !== correct_ans.toString()){
            this.decreasePoints();
            w[i].style.backgroundColor = "#E53935" ;
            w[i].disabled = true;
          }
        if(w[i].id === correct_ans.toString()){
          w[i].style.opacity = 1;
          w[i].style.backgroundColor = "#66BB6A" ;
          var x = w[i].children;
          x[0].style.color = 'rgb(0, 0, 0)';
        }
      }
      this.sleep(750).then(()=>{
        this.getQuestion();
      });
  }


  private getQuestion(){
      // var pb = $('#progress-bar');
      // console.log(pb);
      // console.log(pb.buffer);
      this.getquest.getquestion()
      .subscribe(
        (data:any) => {
                      var w = $("#offline-text");
                      w.innerHTML = "Please Connect to the Internet.Your Points will be updated Only when you are connected to the Internet.";
                      console.log(w);
                      if (data['question'].length>80 || data['option1'].length>25 || data['option2'].length>25 || data['option3'].length>25){
                          this.getQuestion();
                        }
                        else{
                        this.question = data['question'].toUpperCase();
                        this.answer_options = [data['option1'].toUpperCase(), data['option2'].toUpperCase(), data['option3'].toUpperCase()];
                        this.correct_ans = data['correct_answer'].toUpperCase();
                        this.answer_options.push(this.correct_ans.toString());
                        this.shuffleArray(this.answer_options);
                        }
                      },
        (error: any) => {
                        console.log(error);
                        $("#offline-text").innerHTML = "Please Connect to the Internet.Your Points will be updated Only when you are connected to the Internet.";
                        var data =this.getOfflineQuestion();
                        if (data['question'].length>80 || data['option1'].length>25 || data['option2'].length>25 || data['option3'].length>25){
                          this.getQuestion();
                        }
                        else{
                          this.question = data['question'].toUpperCase();
                          this.answer_options = [data['option1'].toUpperCase(), data['option2'].toUpperCase(), data['option3'].toUpperCase()];
                          this.correct_ans = data['correct_answer'].toUpperCase();
                          this.answer_options.push(this.correct_ans.toString());
                          this.shuffleArray(this.answer_options);
                          }
                      }
    );
  }

  private shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  public getOfflineQuestion(){
    var max = Object.keys(this.questions).length;
    var min = 0;
    console.log("Max: " + max.toString());
    var index = Math.floor(Math.random()*(max-min+1)+min);
    var question = this.questions[index]
    return question
  }

  private getNewBackGround(){
    var colors = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#607D8B'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);
    var w = $("ion-content");
    console.log(w);
    // w.style.backgroundColor = color;
  }

  private increasePoints(){
    if (this.counter<1){
      this.counter = 1;
      }
    this.counter+=0.1;
    var addnumber = 10*this.counter;
    this.points = this.points + addnumber;
    // this.showToast("Your answer was correct!","success");
  }

  private decreasePoints(){
    if (this.counter>1 || this.counter<=0){
      this.counter = 1;
      }
    this.counter-=0.1;
    var addnumber = 10*this.counter;
    this.points -= addnumber;
    // this.showToast("Your answer was not correct!\nThe correct answer was "+this.correct_ans,"danger");
  }
  public skipquestion(event: any){
    this.getQuestion();
    this.points = this.points - 5;
  }

  // private showToast(toaststring: string, toastcss: string) {
  //   this.toastController.create({
  //     message: toaststring,
  //     duration: 1500,
  //     animated: true,
  //     // showCloseButton: true,
  //     cssClass: "my-toast "+toastcss,
  //     position: "bottom",
  //   }).then((obj) => {
  //     obj.present();
  //   });
  // }

  // private sleep(milliseconds: number) {
  //   var start = new Date().getTime();
  //   for (var i = 0; i < milliseconds*1e7; i++) {
  //     if ((new Date().getTime() - start) > milliseconds){
  //       break;
  //     }
  //   }
  // }
}