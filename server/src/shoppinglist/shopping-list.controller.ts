import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-lists')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post('create')
  async createList(@Body() data: { userId: number; name: string }) {
    return this.shoppingListService.createShoppingList(data.userId, data.name);
  }

  @Get(':userId')
  async getUserLists(@Param('userId') userId: number) {
    return this.shoppingListService.getUserShoppingLists(userId);
  }

  @Post('add-item')
  async addItem(@Body() data: { listId: number; itemName: string }) {
    return this.shoppingListService.addItemToList(data.listId, data.itemName);
  }

  @Post('complete')
  async completeList(@Body() data: { listId: number; totalCost: number }) {
    return this.shoppingListService.markListAsCompleted(data.listId, data.totalCost);
  }
}