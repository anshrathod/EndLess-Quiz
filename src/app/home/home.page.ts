import { Component } from '@angular/core';
import { GetquestionsService } from "../getquestions.service";
import { ToastController } from '@ionic/angular';
// declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public answer_options: Array<string>;
  public question:String;
  public correct_ans:String;
  private getquest: GetquestionsService;
  public points : number;
  private counter : number;
  // private apiUrl = "https://c6b796eb.ngrok.io";
  // private apiUrl = "http://localhost:5000";

  constructor(private getquestion: GetquestionsService,
              private toastController: ToastController) {
    this.getquest = this.getquestion;
    let hmm = this.getQuestion();
    this.question = "Some random Stupid Question";
    this.answer_options = ["Option1","Option2","Option3"];
    this.correct_ans = "Correctwala"
    this.answer_options.push(this.correct_ans.toString());
    this.points = 1100;
    this.counter = 1;
  }
  public selectanswer(event: any, ans: string, correct_ans: { toString: () => any; }) {
    if (ans === correct_ans.toString()){
      this.increasePoints();
    }
    else{
      this.decreasePoints();
    }
    console.log($('#answer'));
    this.getQuestion();
  }

  private getQuestion(){
    this.getquest.getquestion()
    .subscribe(
      (data:any) => {
                     if (data['question'].length>80 || data['option1'].length>25 || data['option2'].length>25 || data['option3'].length>25){
                        this.getQuestion();
                       }
                      else{
                      this.question = data['question'];
                      this.answer_options = [data['option1'], data['option2'], data['option3']];
                      this.correct_ans = data['correct_answer'];
                      this.answer_options.push(this.correct_ans.toString());
                      this.shuffleArray(this.answer_options);
                      // this.getNewBackGround();
                      }
                    },
      (error: any) => console.log(error)
    );
  }

  private shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
  public getNewBackGround(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  }
  private increasePoints(){
    if (this.counter<1){
      this.counter = 1;
      }
    this.counter+=0.1;
    var addnumber = 10*this.counter;
    this.points = this.points + addnumber;
    this.showToast("Your answer was correct!","success");
  }
  private decreasePoints(){
    if (this.counter>1 || this.counter<=0){
      this.counter = 1;
      }
    this.counter-=0.1;
    var addnumber = 10*this.counter;
    this.points -= addnumber;
    this.showToast("Your answer was not correct!\nThe correct answer was "+this.correct_ans,"danger");
  }
  private showToast(toaststring, toastcss) {
    this.toastController.create({
      message: toaststring,
      duration: 1500,
      animated: true,
      // showCloseButton: true,
      cssClass: "my-toast "+toastcss,
      position: "bottom",
    }).then((obj) => {
      obj.present();
    });
  }
}