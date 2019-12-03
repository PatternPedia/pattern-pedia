/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultPlRendererComponent} from './default-pl-renderer/default-pl-renderer.component';
import {DefaultPatternRendererComponent} from './default-pattern-renderer/default-pattern-renderer.component';
import {ComponentRegistryService} from './service/component-registry.service';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MdEditorComponent} from './component/md-editor/md-editor.component';
import {CovalentTextEditorModule} from '@covalent/text-editor';
import {EmitEventOnKeyupDirective} from './directives/emit-event-on-keyup.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavigateBackComponent} from './component/navigate-back/navigate-back.component';
import {PatternpropertyDirective} from './component/markdown-content-container/patternproperty.directive';
import {DividerComponent} from './component/divider/divider.component';
import {NgxMdModule} from 'ngx-md';
import {ReactiveFormsModule} from '@angular/forms';
import {CreatePatternRelationComponent} from './component/create-pattern-relation/create-pattern-relation.component';
// tslint:disable-next-line:max-line-length
import {MarkdownPatternSectioncontentComponent} from './component/markdown-content-container/markdown-pattern-sectioncontent/markdown-pattern-sectioncontent.component';
import {PatternLanguageService} from './service/pattern-language.service';
import {PatternService} from './service/pattern.service';
import {GraphDisplayComponent} from './component/graph-display/graph-display.component';
import {CardrendererComponent} from './component/cardrenderer/cardrenderer.component';
import {PatternViewService} from './service/pattern-view.service';
import {CreateEditPatternLanguageComponent} from './component/create-edit-pattern-language/create-edit-pattern-language.component';
import {ActionButtonBarComponent} from './component/action-button-bar/action-button-bar.component';
import {EmitEventOnAddedEdgeDirective} from './directives/emit-event-on-added-edge.directive';
import {MatBadgeModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PrettyJsonModule,
        MatButtonModule,
        TextFieldModule,
        CovalentTextEditorModule,
        MatCardModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatDatepickerModule, MatInputModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatSelectModule,
        MatDialogModule, MatGridListModule, MatSidenavModule,
        MatAutocompleteModule,
        MatIconModule, MatToolbarModule, MatBadgeModule,
        MatButtonToggleModule,
        NgxMdModule.forRoot(), MatNativeDateModule
    ],
    exports: [CovalentTextEditorModule, EmitEventOnKeyupDirective, EmitEventOnAddedEdgeDirective, MatProgressSpinnerModule, NavigateBackComponent, CardrendererComponent, ActionButtonBarComponent],
    providers: [
        PatternLanguageService,
        PatternService,
        PatternViewService
    ],
    declarations: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent,
        MdEditorComponent,
        EmitEventOnKeyupDirective,
        EmitEventOnAddedEdgeDirective,
        NavigateBackComponent,
        PatternpropertyDirective,
        DividerComponent,
        CreatePatternRelationComponent,
        MarkdownPatternSectioncontentComponent,
        GraphDisplayComponent,
        CardrendererComponent,
        CreateEditPatternLanguageComponent,
        ActionButtonBarComponent
    ],
    entryComponents: [
        DefaultPlRendererComponent,
        DefaultPatternRendererComponent,
        MdEditorComponent,
        DividerComponent,
        CreatePatternRelationComponent,
        MarkdownPatternSectioncontentComponent,
        CardrendererComponent,
        GraphDisplayComponent,
        CreateEditPatternLanguageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
    constructor(private cr: ComponentRegistryService) {
        this.cr.registerComponent('default', {plcomponent: DefaultPlRendererComponent, pcomponent: DefaultPatternRendererComponent});
    }
}
