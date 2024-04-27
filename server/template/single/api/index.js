// {{apiName}}
import request from '@/utils/request'


{{#each apis}}
  // {{this.name}}
  export function {{this.methodName}}({{getParmas this.method}}) {
    return request({
      url: "{{this.url}}",
      method: "{{this.method}}",
      {{getParmas this.method}}
    })
  }
{{/each}}
