import { AxiosInstance } from 'axios';

import { AttendeeModel, PreferenceModel } from '../types/models';
import { IncludableParameters, WaitListUrlParameters } from '../types/parameters';
import { WaitListRelationship } from '../types/relationships';
import { WaitListResource } from '../types/resources';

export default class WaitList implements WaitListResource {
  protected client: AxiosInstance;
  protected parameters: WaitListUrlParameters;
  protected relationships: WaitListRelationship;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.parameters = {};
    this.relationships = {};
  }

  public async add(): Promise<any> {
    //
  }

  public at(location: number | string): this {
    this.relationships.location = location;

    return this;
  }

  public belonging(client: number | string): this {
    this.parameters.client = client;

    return this;
  }

  public async find(list: number | string): Promise<any> {
    const params: IncludableParameters = {};
    const { client, include } = this.parameters;

    if (include) {
      params.include = include;
    }

    return await this.client.get(`clients/${client}/requests/${list}`, { params });
  }

  public for(attendee: AttendeeModel): this {
    this.relationships.attendee = attendee;

    return this;
  }

  public include(includes: string): this {
    this.parameters.include = includes;

    return this;
  }

  public prefers(preferences: PreferenceModel | PreferenceModel[]): this {
    return this;
  }

  public provided(notes: string): this {
    return this;
  }

  public async remove(list: number | string): Promise<any> {
    const { client } = this.parameters;

    return await this.client.delete(`clients/${client}/requests/${list}`);
  }

  public seeking(service: number | string): this {
    this.relationships.service = service;

    return this;
  }

  public async update(list: number | string): Promise<any> {
    //
  }

  public with(user: number | string): this {
    this.relationships.user = user;

    return this;
  }
}
