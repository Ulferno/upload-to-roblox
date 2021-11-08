# upload-to-roblox
GitHub action to upload a Roblox place to Roblox with the Place Management API

## Inputs

## `api-key`

**Required** Roblox Creator API key. Must have place management API enabled on the places you wish to publish to.

## `universeId`

**Required** Roblox Universe Id where the place is located. *This is different to the place id*

## `placeId`

**Required** Roblox Place Id that you would like to publish to.

## `shouldPublish`

**Optional** Boolean, should the game be saved and published (true) or just saved (false). *Defaults to true*
## 

## Outputs

## `version`

The uploaded place version.

## Example usage

```yaml
- name: upload-to-roblox
  uses: Ulferno/upload-to-roblox@v1.0.0
  with:
    api-key: ${{ secrets.ROBLOX_API_KEY }}
    universeId: 0000000000
    placeId: 0000000000
    file: ./path/to/file.rbxl		
```