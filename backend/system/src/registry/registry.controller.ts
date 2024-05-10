import { Controller, Get, Post, Query } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { firstGoDidKey } from 'src/core/godid_api_key';

@Controller('registry')
export class RegistryController {
  constructor(readonly issuerService: RegistryService) {}

  @Get()
  async resolve(
    @Query('did') did: string | undefined,
    @Query('api_key') api_key: string | undefined,
  ): Promise<Record<string, any>> {
    const res = await fetch(
      `https://api.godiddy.com/0.1.0/universal-resolver/identifiers/${did}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${api_key ?? firstGoDidKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const body = await res.json();
    return body;
  }
  @Post()
  async register_indy_method(
    @Query('method') method: string | undefined,
    @Query('api_key') api_key: string | undefined,
  ): Promise<Record<string, any>> {
    const res = await fetch(
      `https://api.godiddy.com/0.1.0/universal-registrar/create?method=${method}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${api_key ?? firstGoDidKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.status === 200) {
      const body = await res.json();
      return Response.json(
        {
          ...body,
        },
        { status: 200 },
      );
    }
    console.log(res.status);
    console.log(res.body);
    return Response.json(
      {
        detail: res.body,
      },
      { status: 400 },
    );
  }
}
