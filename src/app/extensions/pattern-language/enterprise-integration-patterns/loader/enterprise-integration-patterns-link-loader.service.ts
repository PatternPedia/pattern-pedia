import { Injectable } from '@angular/core';
import Loader from 'src/app/core/model/loader';
import { PatternOntologyService } from 'src/app/core/service/pattern-ontology.service';
import { IriConverter } from 'src/app/core/util/iri-converter';
import { Link } from 'src/app/graph/model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseIntegrationPatternsLinkLoaderService extends Loader<Link> {

  constructor(private pos: PatternOntologyService) {
    super('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns#EnterpriseIntegrationPatterns', pos);
  }

  async selectContentFromStore(): Promise<any> {
    // select all directed links
    const qry = `SELECT ?uri ?source ?target ?description
      WHERE {
          ?uri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://purl.org/patternpedia#DirectedPatternRelationDescriptor> .
          ?uri <https://purl.org/patternpedia#hasSource> ?source .
          ?uri <https://purl.org/patternpedia#hasTarget> ?target .
          OPTIONAL { ?uri <https://purl.org/patternpedia#hasDescription> ?description . }
      }`;

    const graphs = [];
    graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns');
    graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Patterns');
    graphs.push('https://purl.org/patternpedia/patternlanguages/enterpriseintegrationpatterns/enterpriseintegrationpatterns-Relations');
    return this.executor.exec(qry, graphs);
  }

  mapTriples(triples: any): Promise<Map<string, any>> {
    /*
    triples is list of objects with:
    {
      description: null or {
        token: 'literal',
        type: 'string',
        value: string - actual description
      },
      source: {
        token: 'uri',
        value: 'the actual uri of the source pattern'
      },
      target: {
        token: 'uri',
        value: 'the actual uri of the target pattern'
      },
      uri: {
        token: 'uri',
        value: 'uri of the lik itself'
      }
    }
    since there might be multiple triple for the same link but different description (multiple description string allowed)
    e.g. LooseCoupling has 2 description lines leading to 2 objects in the triples list for the same link
    we combine the triples to the following objects:
    {
      id: string - the identifier of the link derived from the URI,
      source: string - the source id derived from the URI,
      target: string - the target id derived from the URI,
      description: [string] - the descriptions. Might be empty
    }
    */
    const data = [];
    for (const t of triples) {

      let item = data.find(i => i.uri === t.uri.value);

      // if no entry for link yet, create new one
      if (!item) {
        item = {
          id: IriConverter.convertIriToId(t.uri.value),
          source: IriConverter.convertIriToId(t.source.value),
          target: IriConverter.convertIriToId(t.target.value),
          description: []
        };

        data.push(item);
      }

      // add description, if available
      if (t.description) {
        item.description.push(t.description.value);
      }
    }

    // create new Link objects from collected data
    const result = new Map<string, Link>();
    for (const l of data) {
      const link = new Link(
        l.source, l.target, null, l.description
      );
      result.set(l.id, link);
    }
    return Promise.resolve(result);
  }
}
