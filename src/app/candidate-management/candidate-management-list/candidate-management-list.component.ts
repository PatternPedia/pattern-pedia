import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatternLanguageService } from 'src/app/core/service/pattern-language.service';
import PatternLanguageModel from 'src/app/core/model/hal/pattern-language-model.model';
import { Candidate, CandidateManagementService } from 'src/app/core/candidate-management';

@Component({
  selector: 'pp-candidate-management-list',
  templateUrl: './candidate-management-list.component.html',
  styleUrls: ['./candidate-management-list.component.scss']
})
export class CandidateManagementListComponent implements OnInit {

  candidates: Candidate[];
  public patternLanguages: PatternLanguageModel[];

  constructor(
    private candidateService: CandidateManagementService,
    private router: Router,
    private patternLanguageService: PatternLanguageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getPatternLanguages();
  }

  getAll() {
    this.candidateService.getAllCandidates().subscribe(result => {
      console.log(result);
      this.candidates = result;
    })
  }

  getPatternLanguages() {
    this.patternLanguageService.getPatternLanguages().subscribe(result => {
      console.log(result);
      const none = new PatternLanguageModel()
      none.name = 'NONE';
      none.id = null;
      this.patternLanguages = [none].concat(result);
      console.log(this.patternLanguages);
    })
  }

  candidateDetail(candidate) {
    console.log(candidate);
    this.router.navigate(['candidate/edit', candidate.name], { state: { data: candidate } });
  }

  createCandidate() {
    this.router.navigate(['candidate/create']);
  }

}
