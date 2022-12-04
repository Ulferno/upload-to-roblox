# upload-to-roblox
GitHub action to upload a Roblox place to Roblox with the [Place Management API](https://create.roblox.com/docs/open-cloud/publishing-places-with-api-keys).

See [Open Cloud](https://create.roblox.com/docs/open-cloud).,

## Inputs

## `api-key`

**Required** Roblox Creator API key. Must have place management API enabled on the places you wish to publish to.

## `universeId`

**Required** Roblox Universe Id where the place is located. *This is different to the place id*

## `placeId`

**Required** Roblox Place Id that you would like to publish to.

## `shouldPublish`

**Optional** Boolean, should the place be saved and published (true) or just saved (false). *Defaults to true*
## 

## Outputs

## `version`

The uploaded place version.

## `uploadTime`

The time (in miliseconds) taken to publish the place.

## Example usage

```yaml
- name: upload-to-roblox
  uses: Ulferno/upload-to-roblox@latest
  with:
    api-key: ${{ secrets.ROBLOX_API_KEY }}
    universeId: 0000000000
    placeId: 0000000000
    file: ./path/to/file.rbxl		
```