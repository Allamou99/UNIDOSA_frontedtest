import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {AdminService} from '../services/admin.service';

interface QuestionDTO{ 
  enonce : any,
  questionType : any,
  listReponseJuste : any,
  listProposition : any
}
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {

  constructor(private fb : FormBuilder,private AdminService : AdminService ) { }

  QuestionForm !: FormGroup;
  QuestionToInsert : QuestionDTO = {
    enonce : null,
    questionType : null,
    listReponseJuste : null,
    listProposition : null
  }

  QuestionRep : Array<QuestionDTO> = []
  createForm(){
    this.QuestionForm = this.fb.group({
      questions : this.fb.array([])
    })

    this.addQuestion();

  }
  ngOnInit(): void {
    this.createForm();
  }

  get questions(){
    return this.QuestionForm.controls["questions"] as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      enonce: ['', Validators.required],
      type: ['', Validators.required],
      reponses:this.fb.array([]),
      bonnerep:this.fb.array([])
    });
    this.questions.push(questionForm);
  }

  getQuestion(){
    this.QuestionRep = []
    var form = this.QuestionForm.controls["questions"].value
    form.forEach((element: { enonce: any; type: any; reponses: any; bonnerep: any; }) => {
      this.QuestionToInsert = {
        enonce : null,
        questionType : null,
        listReponseJuste : null,
        listProposition : null
      }    
      this.QuestionToInsert.enonce = element.enonce,
      this.QuestionToInsert.questionType = element.type,
      this.QuestionToInsert.listProposition = element.reponses,
      this.QuestionToInsert.listReponseJuste = element.bonnerep
      this.QuestionRep.push(this.QuestionToInsert)
    });

    console.log(this.QuestionRep)
    this.AdminService.addQuestion(this.QuestionRep).subscribe(res=>{console.log(res)})
  }
  ///////////////////////////////////////////// REPONSES

  questionsreponse(question_index:number) : FormArray {
    return this.questions.at(question_index).get("reponses") as FormArray
  }
  bonnereponsesquestion(question_index:number) : FormArray{
    return this.questions.at(question_index).get("bonnerep") as FormArray

  }
  newQuestion(): FormGroup {
    return this.fb.group({
      proposition: '',
    });
  }
  newBonneReponse() : FormGroup{
    return this.fb.group({
      bonneRep: '',
    });
  }

  addQuestionReponse(questionIndex: number) {
    this.questionsreponse(questionIndex).push(this.newQuestion());
  }

  addBonneReponse(questionIndex:number){
    this.bonnereponsesquestion(questionIndex).push(this.newBonneReponse());
  }

  /////////////////////////////////////////// BONNE REP



}
