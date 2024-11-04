
export default {
  user: {
    login: {
      method: 'POST',
      url: `/token/`,
      data: { email: String, password: String }
    },
    refresh: { method: 'POST', url: `/token/refresh/`, data: { refresh: '' } },
    me: { method: 'POST', url: `/me/` },
    token_canias_lifetime: {
      method: 'POST',
      url: `/token/canias/`,
      data: { email: String, password: String }
    },
    reseller_application: { method: 'POST', url: `/reseller/application/` },
    update_filters: { method: 'PATCH', url: `/user/update_filters/` },
    finance_info: { method: 'GET', url: `/reseller/finance-info/` },
    address: {
      get: {
        method: 'GET',
        url: page => `/user/address/?page=${page}`
      },
      get_all: {
        method: 'GET',
        url: `/user/address/all`
      },
      get_by_id: { method: 'GET', url: id => `/user/address/${id}` },
      post: {
        method: 'POST',
        url: `/user/address/`,
        data: {
          firm_name: String,
          contact_name: String,
          address_line: String,
          address_line_extra: String,
          city: String,
          district: String,
          phone: String,
          zip_street: String
        }
      },
      put: {
        method: 'PUT',
        url: address_number => `/user/address/${address_number}`,
        data: {
          firm_name: String,
          contact_name: String,
          address_line: String,
          address_line_extra: String,
          city: String,
          district: String,
          phone: String,
          zip_street: String
        }
      },
      delete: {
        method: 'DELETE',
        url: address_number => `/user/address/${address_number}`
      }
    },
    change_password: {
      method: 'PUT',
      url: `/user/change_password/`
    },
    reset_password: {
      method: 'POST',
      url: `/user/reset_password/`
    },
    reset_password_confirm: {
      method: 'POST',
      url: `/user/reset_password/confirm/`
    }
  },
  sub_user: {
    sub_user_list: {
      method: 'GET',
      url: page => `/sub-user/?page=${page}`
    },
    sub_user_by_email: { method: 'GET', url: email => `/sub-user/${email}` },
    add_sub_user: { method: 'POST', url: `/sub-user/` },
    put_sub_user: { method: 'PUT', url: email => `/sub-user/${email}` },
    delete_sub_user: { method: 'DELETE', url: email => `/sub-user/${email}` },
    sub_user_permissions: {
      method: 'GET',
      url: email => `/sub-user/permissions/${email}`
    },
    post_sub_user_permissions: {
      method: 'PUT',
      url: (email, code) => `/sub-user/permissions/${email}/${code}`
    }
  },
  news: {
    article_categories: { method: 'GET', url: `/news/articles/categories/` },
    article_categories_id: {
      method: 'GET',
      url: id => `/news/articles/categories/${id}`
    },
    article_detail_id: { method: 'GET', url: id => `/news/articles/${id}` },
    article_tag: {
      method: 'GET',
      url: id => `/news/articles/?tags=${id}&sort=published_at`
    },
    b2c_articles: {
      method: 'GET',
      url: `/news/articles/b2c/`,
      params: { type: 'blog' }
    },
    tags: {
      method: 'GET',
      url: tag_type => `/news/tags/?type=${tag_type}`
    },
    articles: {
      method: 'GET',
      url: '/news/articles/'
    },
    solution_list: {
      method: 'GET',
      url: `/news/solutions/`,
      params: {
        display: ['showcase', 'tag', 'homepage']
      }
    },
    solution_mega_menu: {
      method: 'GET',
      url: `/news/solutions/mega_menu/`
    },
    solution_page_url: {
      method: 'GET',
      url: page_url => `/news/solutions/${page_url}`
    },
    solution_banner: { method: 'GET', url: `/news/solutions/banners/` },
    solutions_homepage: {
      method: 'GET',
      url: type => `news/solutions/?sort_for=${type}`
    },
    corporate_list: {
      method: 'GET',
      url: '/news/corporate'
    },
    corporate_slug: {
      method: 'GET',
      url: slug => `/news/corporate/${slug}`
    },
    corporate_category_list: {
      method: 'GET',
      url: `/news/corporate/categories/`
    },
    corporate_category_id: {
      method: 'GET',
      url: id => `/news/corporate?category=${id}`
    }
  },
  campaigns: {
    article: { method: 'GET', url: `/campaigns/article/` },
    campaign_detail: {
      method: 'GET',
      url: page_url => `/campaigns/article/${page_url}`
    },
    get: {
      method: 'GET',
      url: `campaigns/`
    },
    getById: {
      method: 'GET',
      url: id => `campaigns/goals/${id}`
    },
    hybrone_goals: {
      method: 'GET',
      url: `campaigns/hybrone/goals/`
    }
  },
  document: {
    categories: { method: 'GET', url: `/document/categories/` },
    categories_id: { method: 'GET', url: id => `/document/categories/${id}` },
    document_id: { method: 'GET', url: id => `/document/${id}` }
  },
  product: {
    product_list: { method: 'GET', url: `/products/` },
    brand_products: { method: 'GET', url: `/products/` },
    brands: { method: 'GET', url: `/products/brands/` },
    product_detail: { method: 'GET', url: id => `/products/${id}` },
    product_outlet_detail: {
      method: 'GET',
      url: id => `/products/outlets/${id}`
    },
    product_outlets: { method: 'GET', url: `/products/outlets/` },
    product_bcp: { method: 'GET', url: `/products/1081/bcp` },
    product_categories: { method: 'GET', url: `/products/categories/` },
    product_filter: { method: 'GET', url: id => `/products/filter/${id}` },
    product_campaign: {
      method: 'GET',
      url: stock_code => `/product/campaign/${stock_code}`
    },
    product_similar: {
      method: 'GET',
      url: stock_code => `/products/similar/${stock_code}`
    },
    product_similar_counter: {
      method: 'POST',
      url: `/products/similar-counter/`
    },
    product_related: {
      method: 'GET',
      url: stock_code => `/products/related/${stock_code}`
    },
    product_pdf: {
      method: 'GET',
      url: stock_code => `/products/${stock_code}/pdf`,
      responseType: 'blob'
    }
  },
  showcase: {
    list: { method: 'GET', url: `/showcases/` },
    list_id: { method: 'GET', url: id => `/showcases/${id}` }
  },
  basket: {
    raw_basket: {
      method: 'GET',
      url: `/basket/raw_basket/`
    },
    save: {
      method: 'POST',
      url: `/basket/save/`
    },
    save_locked_basket: {
      method: 'GET',
      url: `/kilit-basket/`
    },
    list_locked_basket: {
      method: 'POST',
      url: `/kilit-basket/`,
      data: {
        offer_num: String,
        offer_type: String
      }
    },
    saved_basket: {
      method: 'POST',
      url: id => `/basket/use_saved_basket/${id}`
    },
    add: {
      method: 'POST',
      url: `/basket/`,
      data: {
        stock_code: String,
        quantity: Number
      }
    },
    update: {
      method: 'PATCH',
      url: `/basket/`,
      data: {
        stock_code: String,
        quantity: Number
      }
    },
    reset: {
      method: 'DELETE',
      url: `/basket/`
    },
    save_list: {
      method: 'GET',
      url: `/basket/save/`
    },
    save_delete: {
      method: 'DELETE',
      url: id => `/basket/save/all/${id}`
    },
    save_delete_all: {
      method: 'DELETE',
      url: `/basket/save/all/`
    },
    save_delete_item: {
      method: 'DELETE',
      url: id => `/basket/save/${id}`
    },
    list: {
      method: 'GET',
      url: `/basket/`,
      params: {
        payment_type: 'bank_transfer',
        currency: 'USD',
        calculate_other_payments: true,
        is_use_wallet_points: false,
        used_wallet_points: 0
      }
    },
    list_campaign_products: {
      method: 'GET',
      url: `/basket/available_campaigns/`
    }
  },
  banner: {
    list_id: { method: 'GET', url: id => `/banners/?category=${id}` },
    categories_list: { method: 'GET', url: `/banners/categories/` }
  },
  checkout: {
    credit_card: {
      hook: { method: 'GET', url: `/checkout/credit-card/hook/` },
      get: { method: 'GET', url: `/checkout/credit-card/` },
      post: { method: 'POST', url: `/checkout/credit-card/` }
    },
    finance_info: { method: 'GET', url: `/reseller/finance-info/` },
    open_account: { method: 'POST', url: `/checkout/open-account/` },
    transfer: { method: 'POST', url: `/checkout/transfer/` },
    retrieve_installments: {
      method: 'POST',
      url: `/checkout/retrieve_installments/`
    },
    cheque: {
      create: { method: 'POST', url: `/for_you/cheque-create/` },
      list: { method: 'GET', url: `/for_you/cheque-list/` },
      pay: { method: 'POST', url: `/checkout/cheque/` }
    }
  },
  offer: {
    client: {
      get: { method: 'GET', url: `/offer/client/` },
      post: { method: 'POST', url: `/offer/client/` },
      getId: { method: 'GET', url: id => `/offer/client/${id}` },
      put: { method: 'PUT', url: id => `/offer/client/${id}` }
    },
    get: {
      method: 'GET',
      url: (limit, offset) => `/offer/?limit=${limit}&offset=${offset}`
    },
    get_with_id: { method: 'GET', url: id => `/offer/${id}` },
    put_with_id: { method: 'PUT', url: id => `/offer/${id}` },
    delete_with_id: { method: 'DELETE', url: id => `/offer/${id}` },
    copy: { method: 'POST', url: id => `/offer/copy/${id}` },
    post: { method: 'POST', url: `/offer/` },
    default_settings: {
      get: { method: 'GET', url: `/offer/default_settings/` },
      patch: { method: 'PATCH', url: `/offer/default_settings/` }
    },
    add_offer_line: {
      method: 'POST',
      url: stock_code => `/offer/${stock_code}/line/`
    },
    get_offer_line: {
      method: 'GET',
      url: stock_code => `/offer/${stock_code}/line/`
    },
    delete_offer_line: {
      method: 'DELETE',
      url: id => `/offer/line/${id}`
    },
    patch_offer_line: {
      method: 'PATCH',
      url: id => `/offer/line/${id}`
    },
    special: {
      method: 'POST',
      url: `/special-offer`,
      payload: {
        stock_code: '',
        quantity: null,
        payment_type: ''
      }
    }
  },
  for_you: {
    card_list: {
      method: 'GET',
      url: `/for_you/card-list/`
    },
    card_create: {
      method: 'POST',
      url: `/for_you/card-create/`
    },
    card_delete: {
      method: 'DELETE',
      url: `/for_you/card-delete/`
    },
    favorite_product_list: {
      method: 'GET',
      url: `/favorite/product/`
    },
    favorite_category_list: {
      method: 'GET',
      url: `/favorite/category/`
    },
    reseller_statement: {
      method: 'GET',
      url: `/for_you/reseller-statement/`
    },
    iyzilink_log: {
      method: 'GET',
      url: `/for_you/iyzilink_log/`
    },
    iyzico_retrieve_installments: {
      method: 'POST',
      url: `/for_you/balance_payment/iyzico/retrieve_installments/`
    },
    iyzico_balance_payment: {
      method: 'POST',
      url: `/for_you/balance_payment/iyzico/`
    },
    iyzilink_balance_payment: {
      method: 'POST',
      url: `/for_you/balance_payment/iyzilink/`
    },
    received_offers_list: {
      method: 'GET',
      url: `/for_you/receivedoffers/`,
      params: {
        start_date: '2020-02-01',
        end_date: '2020-06-01'
      }
    },
    reveived_special_offer: {
      method: 'GET',
      url: `/special-offer`,
      params: {
        start_date: '2020-02-01',
        end_date: '2020-06-01'
      }
    },
    received_offers_detail: {
      method: 'GET',
      url: id => `/for_you/receivedoffers/${id}`
    },
    order_history: {
      method: 'GET',
      url: `/for_you/order_history/`
    },
    invoice_history: {
      method: 'GET',
      url: `/for_you/invoices/`
    },
    order_history_id: {
      method: 'GET',
      url: id => `/for_you/order_history/${id}`
    },
    invoice_history_id: {
      method: 'GET',
      url: id => `/for_you/invoices/${id}`
    },
    technical_service: {
      method: 'GET',
      url: `/for_you/on-technical-services/`
    },
    technical_service_detail: {
      method: 'GET',
      url: payload => `/for_you/technical-service/${payload.type}/${payload.id}`
    },
    technical_service_offer_detail: {
      method: 'GET',
      url: payload =>
        `/for_you/technical-service/offers/${payload.type}/${payload.id}`
    },
    technical_service_offers: {
      method: 'GET',
      url: `/for_you/technical-service/offers/`
    },
    remittance_report: {
      method: 'GET',
      url: `/for_you/remittance_report/`
    },
    remittance_report_post: {
      method: 'POST',
      url: `/for_you/remittance_report/`
    },
    payment_history_old: {
      method: 'GET',
      url: `/for_you/payment_history_old/`
    },
    payment_history: {
      method: 'GET',
      url: `/for_you/payment_history/`
    },
    payment_history_by_id: {
      method: 'GET',
      url: id => `/for_you/payment_history/${id}`
    },
    payment_history_by_id_old: {
      method: 'GET',
      url: id => `/for_you/payment_history_old/${id}`
    },
    reseller_general_info: {
      method: 'GET',
      url: `/for_you/reseller-general-info/`
    },
    reseller_advantages: {
      method: 'GET',
      url: `/for_you/reseller_advantages/`
    },
    cheque_bill_information: {
      method: 'GET',
      url: `for_you/cheque-bill-information/`
    },
    //
    // biges_club_general_info: {
    //   method: 'GET',
    //   url: `for_you/biges_club_general_info/`
    // },
    // biges_club_detail_info: {
    //   method: 'GET',
    //   url: `for_you/biges_club_detail_info/`
    // },
    user_profile: {
      get: {
        method: 'GET',
        url: `for_you/user-profile/`
      },
      put: { method: 'PUT', url: `for_you/user-profile/` }
    },
    wallet_movements: {
      get: {
        method: 'GET',
        url: (startDate, endDate) =>
          `for_you/wallet_movements/?start_date=${startDate}&end_date=${endDate}`
      }
    },
    wallet_point: {
      get: {
        method: 'GET',
        url: `for_you/wallet_points/`
      }
    },
    warranty: {
      query: {
        method: 'GET',
        url: serial_number => `for_you/warranty_query/${serial_number}`
      },
      status_search: {
        method: 'GET',
        url: serial_number => `for_you/warranty_status_search/${serial_number}`
      },
      product_check: {
        method: 'GET',
        url: serial_number => `for_you/warranty_product_check/${serial_number}`
      },
      update: {
        method: 'POST',
        url: 'for_you/warranty_update/'
      }
    }
  },
  search: {
    query: { method: 'GET', url: q => `/search/${q}` },
    popular: { method: 'GET', url: '/products/popular/' },
    offer: { method: 'GET', url: `/offer/search-product/` },
    types: {
      method: 'GET',
      url: (text, type) => `/search/?q=${text}&type=${type}`
    }
  },
  references: {
    brands: { method: 'GET', url: `/references/brands/` },
    references: { method: 'GET', url: `/references/references/` }
  },
  favorite: {
    add_category: { method: 'POST', url: '/favorite/category/' },
    category_list: {
      method: 'GET',
      url: '/favorite/category/'
    },
    remove_product_favorite: {
      method: 'DELETE',
      url: id => `/favorite/product/${id}`
    },
    add_product_to_category: { method: 'POST', url: '/favorite/product/' },
    product_list: { method: 'GET', url: '/favorite/product/' }
  },
  contact_us: {
    category: { method: 'GET', url: '/contact_us/category/' },
    contact_us: { method: 'POST', url: '/contact_us/' }
  },
  notification: {
    notifications: { method: 'GET', url: '/notification/' },
    notification: {
      method: 'GET',
      url: id => `/notification/${id}`
    },
    notification_read: {
      method: 'POST',
      url: id => `/notification/set_read/${id}`
    },
    notification_clicked: {
      method: 'POST',
      url: id => `/notification/set_clicked/${id}`
    }
  },
  support: {
    category: { method: 'GET', url: '/support/category/' },
    detail: { method: 'GET', url: id => `/support/detail/${id}` },
    search: { method: 'GET', url: id => `/search/support/?q=${id}` },
    document: {
      method: 'GET',
      url: id => `/support/document/${id || ''}`,
      params: {
        stock_code: null,
        category: null
      }
    },
    support_category: {
      method: 'GET',
      url: `/support/supports-by-categories/`,
      params: {
        stock_code: null,
        category: null
      }
    },
    general_FAQ: {
      method: 'GET',
      url: '/support/general_faq/category',
      id: categoryId => `/support/general_faq/?category=${categoryId}`
    },
    product_FAQ: {
      method: 'GET',
      url: id => `/support/product_faq/${id || ''}`,
      params: {
        stock_code: null,
        category: null
      }
    },
    software: {
      method: 'GET',
      url: id => `/support/software/${id || ''}`,
      params: {
        stock_code: null,
        category: null
      }
    },
    video: {
      method: 'GET',
      url: id => `/support/video/${id || ''}`,
      params: {
        stock_code: null,
        category: null
      }
    }
  },
  custom_page: {
    get: {
      method: 'GET',
      url: (category, pageName) => `/custom_page/${category}/${pageName}`
    }
  },
  compare: {
    create_uuid: {
      method: 'GET',
      url: `/compare/b2c/uuid/`
    },
    products_with_detail: {
      method: 'GET',
      url: b => `/compare/${b}/detail/`
    },
    products: {
      method: 'GET',
      url: b => `/compare/${b}/`
    },
    delete_all: {
      method: 'DELETE',
      url: b => `/compare/${b}/`
    },
    delete_by_code: {
      method: 'DELETE',
      url: (b, stock_code) => `/compare/${b}/${stock_code}`
    },
    add_product: {
      method: 'POST',
      url: (b, stock_code) => `/compare/${b}/${stock_code}`
    }
  },
  core: {
    currencies: { method: 'GET', url: '/core/currencies/' },
    locations: { method: 'GET', url: '/core/locations/' },
    district_locations: {
      method: 'GET',
      url: city => `/core/locations/?city=${city}`
    }
  },
  preorder: {
    price: {
      method: 'POST',
      url: '/preorder-price/'
    },
    create_locked_basket: {
      method: 'POST',
      url: '/preorder-create/'
    }
  },
  user_delete: {
    delete: { method: 'DELETE', url: '/user/delete/' }
  }
}
