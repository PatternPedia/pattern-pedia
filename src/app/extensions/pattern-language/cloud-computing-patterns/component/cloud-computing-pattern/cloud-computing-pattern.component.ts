import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { PatternRenderingComponentInterface } from '../../../../../core/model/pattern-rendering-component.interface';
import { CloudComputingPatternsLoaderService } from '../../loader/cloud-computing-patterns-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import CloudComputingPattern from '../../model/cloud-computing-pattern';
import { IriConverter } from '../../../../../core/util/iri-converter';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MatDialog } from '@angular/material';
import { DialogData, MdEditorComponent } from '../../../../../core/component/md-editor/md-editor.component';
import { CloudComputingPatternsWriterService } from '../../writer/cloud-computing-patterns-writer.service';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';

@Component({
    selector: 'pp-cloud-computing-pattern',
    templateUrl: './cloud-computing-pattern.component.html',
    styleUrls: ['./cloud-computing-pattern.component.scss']
})
export class CloudComputingPatternComponent implements PatternRenderingComponentInterface, OnInit, OnChanges {

    @ViewChild('mdEditor') private _textEditor: TdTextEditorComponent;

    pId: string;

    pattern: CloudComputingPattern;
    mdEditorOptions = {};
    editMode = {
        intent: {showActionButtons: false},
        drivingQuestion: {showActionButtons: false},
        context: {showActionButtons: false},
        solution: {showActionButtons: false},
        solutionSketches: {showActionButtons: false},
        result: {showActionButtons: false},
    };

    constructor(private loader: CloudComputingPatternsLoaderService,
                private writer: CloudComputingPatternsWriterService,
                private cdr: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private zone: NgZone,
                private dialog: MatDialog,
                private pos: PatternOntologyService) {
    }

    ngOnInit(): void {
      // we have to load the individual patterns first by getting all imports from the base file
      const uris = [
        {value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns'},
        {value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Patterns'},
        {value: 'https://purl.org/patternpedia/patternlanguages/cloudcomputingpatterns/cloudcomputingpatterns-Relations'}
      ];

      this.pos.loadUrisToStore(uris)
        .then(() => this.loadData());

      // to get the changes from the network graph 
      this.activatedRoute.params.subscribe(params => {
        if (this.pId != params['pid']) {
          this.loadData();
        }
      });
    }

    private async loadData(): Promise<void> {
      return this.loader.loadContentFromStore()
        .then(patternMap => {
          this.pattern = patternMap.get(IriConverter.convertIdToIri(this.pId));
          this.cdr.detectChanges();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
      console.log('> Changes');
      if (changes['pId']
        && JSON.stringify(changes['pId'].currentValue) !== JSON.stringify(changes['pId'].previousValue)) {
          // reload everything
          this.loader.loadContentFromStore()
            .then(patternMap => {
                this.pattern = patternMap.get(IriConverter.convertIdToIri(this.pId));
                this.cdr.detectChanges();
            });
      }
    }

    openEditor(field: string): void {
        const dialogRef = this.dialog.open(MdEditorComponent,
            {data: {field: field, label: this.pattern[field].label, content: this.pattern[field].value}});
        this.editMode[field].edit = true;
        dialogRef.afterClosed().subscribe(async (result: DialogData) => {
            this.pattern[field].value = result.content;
            await this.writer.writePatternToStore(this.pattern).catch(err => console.error(err));
        });
    }

    navigateBack(): void {
        this.zone.run(() => {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        });
    }
}
