import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ProductCart } from '../model/productCart';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = 'https://localhost:7065/api/Gumcraft';
  private TRANSACTION_URL = 'https://localhost:7065/api/Transaction';

  constructor(private httpClient: HttpClient) {}

  public async getCartByUserId(): Promise<ProductCart[]> {
    try {
      const token = localStorage.getItem('Token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const request = this.httpClient
        .get(`${this.API_URL}/cart/products`, { headers })
        .pipe(map((response: any) => response.map(this.mapToItem)));

      return await lastValueFrom(request);
    } catch (error) {
      throw error;
    }
  }

  private mapToItem(item: any): ProductCart {
    return {
      productId: item.productId,
      name: item.name,
      amount: item.amount,
      price: item.price,
    };
  }

  /**
   * addProductToCart
   */
  public async addProductToCart(productId: number): Promise<string> {
    const token = localStorage.getItem('Token');
    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }).set('Authorization', `Bearer ${token}`),
      responseType: 'text',
    };
    try {
      const request = this.httpClient.put(
        `${this.API_URL}/cart/product/${productId}`,
        ' ',
        options
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * removeProductFromCart
   */

  public async removeProductFromCart(productId: number): Promise<string> {
    const token = localStorage.getItem('Token');
    const options: any = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
      }).set('Authorization', `Bearer ${token}`),
      responseType: 'text',
    };
    try {
      const request = this.httpClient.put(
        `${this.API_URL}/cart/productDel/${productId}`,
        ' ',
        options
      );
      const response: any = await lastValueFrom(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Transacciones
   */
  async buy() {
    const account = await this.getAccount();
    let transaction = await this.post(`${this.TRANSACTION_URL}/Buy`, JSON.stringify(account)) as Transaction;

    console.log(transaction);
    
    const txHash = await this.makeTransaction(transaction);
    const transactionSuccess = await this.post(`/check/${transaction.id}`, JSON.stringify(txHash));

    console.log('Transacción realizada: ' + transactionSuccess);

    const transactionMessage = transactionSuccess
      ? 'Transacción realizada con éxito :D'
      :'Transacción fallida :(';
  }

  private async getAccount() : Promise<string> {
    if (typeof window.ethereum == 'undefined') {
      throw new Error('MetaMask no está instalado');
    }

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const account = accounts[0];

    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          "eth_accounts": { account }
        }
      ]
    });

    return account;
  }

  private async makeTransaction(transaction: Transaction) : Promise<string> {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          gas: transaction.gas,
          gasPrice: transaction.gasPrice
        }
      ]
    });

    return txHash;
  }

  private async post(url: string, data: any) : Promise<any> {
    const headers = {'Content-Type': `application/json`};
    let request$ =  this.httpClient.post(`${this.TRANSACTION_URL}${url}`, data, {headers});

    return await lastValueFrom(request$);
  }
}
declare global {
  interface Window {
    ethereum: any;
  }
}
