import { Component, OnInit } from "@angular/core";
import { Goal } from "../goal";
import { GoalService } from "../goal-service/goal.service";
import { AlertService } from "../alert-service/alert.service";
import { HttpClient } from "@angular/common/http";
import { Quote } from "../quote-class/quote";
import { QuoteRequestService } from "../quote-http/quote-request.service";
import { Router } from '@angular/router';



@Component({
  selector: "app-goal",
  templateUrl: "./goal.component.html",
  styleUrls: ["./goal.component.css"]
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  goToUrl(id) {
    this.router.navigate(['./goals',id])
  }
  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }
  // goals: Goal[] = [
  //   new Goal(
  //     1,
  //     "Watch finding Nemo",
  //     "Find an online version and watch merlin find his son",
  //     new Date(2019, 9, 14)
  //   ),
  //   new Goal(
  //     2,
  //     "Buy Cookies",
  //     "I have to buy cookies for the parrot",
  //     new Date(2019, 6, 9)
  //   ),
  //   new Goal(
  //     3,
  //     "Get new Phone Case",
  //     "Diana has her birthday coming up soon",
  //     new Date(2019, 1, 12)
  //   ),
  //   new Goal(
  //     4,
  //     "Get Dog Food",
  //     "Pupper likes expensive snacks",
  //     new Date(2019, 11, 18)
  //   ),
  //   new Goal(5, "Solve math homework", "Damn Math", new Date(2019, 2, 14)),
  //   new Goal(
  //     6,
  //     "Plot my world domination plan",
  //     "Cause I am an evil overlord",
  //     new Date(2019, 3, 14)
  //   )
  // ];
  alertService: AlertService;
  quote: Quote;
  goal: Goal[];
  http: HttpClient;

  addNewGoal(goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate);
    this.goals.push(goal);
  }
  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  deleteGoal(index) {{
      let toDelete = confirm(
        `Are you sure you want to delete ${this.goals[index].name}?`
      );

      if (toDelete) {
        this.goals.splice(index, 1);
        this.alertService.alertMe("The goal has been deleted");
      }
    }
  }
  constructor(
    private router:Router,
    private goalService: GoalService,
    alertService: AlertService,
    private quoteService: QuoteRequestService
  ) {
    this.alertService = alertService;
  }
  getGoals(): void {
    this.goals = this.goalService.getGoals();
  }
  ngOnInit() {
    this.getGoals();
    this.quoteService.quoteRequest();
    this.quote = this.quoteService.quote;

    // interface ApiResponse {
    //   author: string;
    //   quote: string;
    // }

    // this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json")
    //   .subscribe(
    //     data => {
    //       // Succesful API request
    //       this.quote = new Quote(data.author, data.quote);
    //     },
    //     err => {
    //       this.quote = new Quote("Winston Churchill", "Never never give up!");
    //       console.log("An error occurred");
    //     }
    //   );
  }
}
